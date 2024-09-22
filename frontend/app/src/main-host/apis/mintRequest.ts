import type { MintTokenRequestDto } from '@yeager/dtos/mintTokenDto.js'


export default async function mintRequest(dto: MintTokenRequestDto) {
  const formData = new FormData()
  Object.entries(dto).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return fetch(`${import.meta.env.VITE_HOST_URL}/api/v1/mint-request`, {
    method: 'POST',
    headers: {
      contentType: 'multipart/form-data'
    },
    body: formData
  })
}
