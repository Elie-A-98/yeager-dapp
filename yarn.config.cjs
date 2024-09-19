//@ts-check

/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require("@yarnpkg/types");

module.exports = defineConfig({
  async constraints({ Yarn }) {

    // Ensure backend workspaces are never referenced from outside
    const backendWorkspaces = [Yarn.workspace({ident: '@yeager/api'}), Yarn.workspace({ident: '@yeager/application'}), Yarn.workspace({ident: '@yeager/domain'})]
    backendWorkspaces.forEach(backendWorkspace => {
        if(!backendWorkspace || !backendWorkspace.ident) return;
        for(const dep of Yarn.dependencies({ident: backendWorkspace.ident})){
            if(backendWorkspaces.includes(dep.workspace)) return
            dep.delete();
        }
    })
    
    // Ensure correct dependency direction for Clean Architecture workspaces
    const domain = Yarn.workspace({
        ident: '@yeager/domain'
    })
    const application = Yarn.workspace({
        ident: '@yeager/application'
    })
    const api = Yarn.workspace({
        ident: '@yeager/api'
    })

    for(const dep of Yarn.dependencies({ident: 'application'})){
        if(dep.workspace === domain){
            dep.delete();
        }
    }
    for(const dep of Yarn.dependencies({ident: 'api'})){
        if(dep.workspace === domain || dep.workspace === application){
            dep.delete();
        }
    }
  },
});
