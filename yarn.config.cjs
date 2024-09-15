//@ts-check

/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require("@yarnpkg/types");

module.exports = defineConfig({
  async constraints({ Yarn }) {

    // Ensure backend workspaces are never referenced from outside
    const backendWorkspaces = [Yarn.workspace({ident: 'api'}), Yarn.workspace({ident: 'application'}), Yarn.workspace({ident: 'domain'})]
    backendWorkspaces.forEach(backendWorkspace => {
        if(!backendWorkspace || !backendWorkspace.ident) return;
        for(const dep of Yarn.dependencies({ident: backendWorkspace.ident})){
            if(backendWorkspaces.includes(dep.workspace)) return
            dep.delete();
        }
    })
    
    // Ensure correct dependency direction for Clean Architecture workspaces
    const domain = Yarn.workspace({
        ident: 'domain'
    })
    const application = Yarn.workspace({
        ident: 'application'
    })
    const api = Yarn.workspace({
        ident: 'api'
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
