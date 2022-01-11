"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[950],{"./public/app/features/org/NewOrgPage.tsx":(e,a,n)=>{n.r(a),n.d(a,{NewOrgPage:()=>h,default:()=>m});n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js");var r,t,s,i=n("./packages/grafana-runtime/src/index.ts"),o=n("./public/app/core/components/Page/Page.tsx"),c=n("./packages/grafana-ui/src/index.ts"),d=n("./public/app/core/config.ts"),l=n("./.yarn/__virtual__/react-redux-virtual-8e30c710ae/3/opt/drone/yarncache/react-redux-npm-7.2.5-cf7e365145-04ac4a4178.zip/node_modules/react-redux/es/index.js"),g=n("./public/app/core/selectors/navModel.ts"),p=n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const u=async e=>{const a=await(0,i.getBackendSrv)().post("/api/orgs/",e);await(0,i.getBackendSrv)().post("/api/user/using/"+a.orgId),window.location.href=(0,d.iE)().appSubUrl+"/org"},h=({navModel:e})=>(0,p.jsx)(o.Z,{navModel:e,children:(0,p.jsxs)(o.Z.Contents,{children:[r||(r=(0,p.jsx)("h3",{className:"page-sub-heading",children:"New organization"})),t||(t=(0,p.jsxs)("p",{className:"playlist-description",children:["Each organization contains their own dashboards, data sources, and configuration, which cannot be shared shared between organizations. While users might belong to more than one organization, multiple organizations are most frequently used in multi-tenant deployments."," "]})),(0,p.jsx)(c.Form,{onSubmit:u,children:({register:e,errors:a})=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.Field,{label:"Organization name",invalid:!!a.name,error:a.name&&a.name.message,children:(0,p.jsx)(c.Input,Object.assign({placeholder:"Org name"},e("name",{required:"Organization name is required",validate:async e=>await(async e=>{try{await(0,i.getBackendSrv)().get(`api/orgs/name/${encodeURI(e)}`)}catch(e){return 404===e.status?(e.isHandled=!0,!0):"Something went wrong"}return"Organization already exists"})(e)})))}),s||(s=(0,p.jsx)(c.Button,{type:"submit",children:"Create"}))]})})]})}),m=(0,l.connect)((e=>({navModel:(0,g.h)(e.navIndex,"global-orgs")})))(h)}}]);
//# sourceMappingURL=NewOrgPage.1f65f885c5a67f13d9d6.js.map