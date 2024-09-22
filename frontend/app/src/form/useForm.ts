import { ref } from 'vue'
import { z } from 'zod'

type Data = Record<string, unknown>
type DataKeys<TData extends Data> = keyof TData & string
type Errors<TData extends Data> = Record<DataKeys<TData>, string | undefined>
type ValidationEvent = 'onUpdate' | 'onBlur'
type ValidationSchema<TData extends Data> = z.ZodObject<{
  [Key in keyof Partial<TData>]: z.ZodTypeAny
}>

type FormState = {
  isSubmitting: boolean
}

export type Controller = {
  name: string
  value: unknown
  onUpdate: (event: Event) => void
  onBlur: (event: FocusEvent) => void
}

type UseFormProps<TData extends Data> = {
  initialValues: TData
  schema: ValidationSchema<TData>
}

type UseFormReturn<TData extends Data> = {
  values: TData
  errors: Errors<TData>
  handleSubmit: (handler: (data: TData) => Promise<void>) => Promise<void>
  formState: FormState
  register: (key: DataKeys<TData>, validationEvent?: ValidationEvent) => Controller
}

const getMessageFromError = <TData extends Data>(error: z.ZodError, key: DataKeys<TData>) => {
  if (error) {
    return error.formErrors.fieldErrors[key]?.at(0) || 'Invalid input'
  }
  return 'Invalid input'
}

const validateSingleInput = <TData extends Data>(
  key: DataKeys<TData>,
  value: unknown,
  schema: ValidationSchema<TData>
) => {
  //@ts-expect-error this will be the corret type because it is enforced by TData
  const { error, success } = schema.pick({ [key]: true }).safeParse({ [key]: value })
  return { error, success }
}

export const useForm = <TData extends Data = Data>(
  props: UseFormProps<TData>
): UseFormReturn<TData> => {
  const { initialValues, schema } = props
  const values = ref<TData>(initialValues)
  const errors = ref<Errors<TData>>(
    Object.keys(initialValues).reduce<Errors<TData>>(
      (acc, curr) => ({
        ...acc,
        [curr]: undefined
      }),
      {} as Errors<TData>
    )
  )

  const formState = ref<FormState>({
    isSubmitting: false
  })

  const onUpdateInternal = (key: DataKeys<TData>, value: unknown, validate: boolean) => {
    values.value[key] = value
    if (validate) {
      const { error, success } = validateSingleInput(key, value, schema)
      if (!success && error) {
        errors.value[key] = getMessageFromError(error, key)
      } else {
        errors.value[key] = undefined
      }
    }
  }

  const onBlurInternal = (key: DataKeys<TData>, validate: boolean) => {
    if (validate) {
      const { error, success } = validateSingleInput(key, values.value[key], schema)
      if (!success && error) {
        errors.value[key] = getMessageFromError(error, key)
      } else {
        errors.value[key] = undefined
      }
    }
  }

  const register: UseFormReturn<TData>['register'] = (
    key: DataKeys<TData>,
    validationEvent = 'onUpdate'
  ) => {
    const onUpdate = (event: Event) => {
      if (event.target && 'value' in event.target) {
        return onUpdateInternal(key, event.target.value, validationEvent === 'onUpdate')
      }
    }

    return {
      name: key,
      value: values.value[key],
      onUpdate,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onBlur: (_: FocusEvent) => onBlurInternal(key, validationEvent === 'onBlur')
    }
  }

  const handleSubmit: UseFormReturn<TData>['handleSubmit'] = async (handler) => {
    let isFormValid = true
    Object.keys(values.value).forEach((key) => {
      const { error, success } = validateSingleInput(key, values.value[key], schema)
      if (!success && error) {
        isFormValid = false
        errors.value[key] = getMessageFromError(error, key)
      } else {
        errors.value[key] = undefined
      }
    })
    if (isFormValid) {
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = undefined
      })
      formState.value.isSubmitting = true
      await handler(values.value)
      formState.value.isSubmitting = false
    }
  }

  return {
    register,
    values: values.value,
    errors: errors.value,
    handleSubmit,
    formState: formState.value
  }
}
