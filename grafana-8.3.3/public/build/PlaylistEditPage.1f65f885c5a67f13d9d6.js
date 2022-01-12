"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2341],{"./public/app/features/playlist/PlaylistEditPage.tsx":(e,a,t)=>{t.r(a),t.d(a,{PlaylistEditPage:()=>m,default:()=>y});t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js");var s=t("./.yarn/__virtual__/react-redux-virtual-8e30c710ae/3/opt/drone/yarncache/react-redux-npm-7.2.5-cf7e365145-04ac4a4178.zip/node_modules/react-redux/es/index.js"),l=t("./packages/grafana-runtime/src/index.ts"),i=t("./packages/grafana-ui/src/index.ts"),n=t("./public/app/core/components/Page/Page.tsx"),r=t("./public/app/core/selectors/navModel.ts"),o=t("./public/app/features/playlist/PlaylistForm.tsx"),c=t("./public/app/features/playlist/api.ts"),d=t("./public/app/features/playlist/usePlaylist.tsx"),p=t("./public/app/features/playlist/styles.ts"),u=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const m=({navModel:e,match:a})=>{const t=(0,i.useStyles2)(p.e),{playlist:s,loading:r}=(0,d.Z)(a.params.id);return(0,u.jsx)(n.Z,{navModel:e,children:(0,u.jsxs)(n.Z.Contents,{isLoading:r,children:[(0,u.jsx)("h3",{className:t.subHeading,children:"Edit playlist"}),(0,u.jsx)("p",{className:t.description,children:"A playlist rotates through a pre-selected list of dashboards. A playlist can be a great way to build situational awareness, or just show off your metrics to your team or visitors."}),(0,u.jsx)(o.H,{onSubmit:async e=>{await(0,c.CE)(a.params.id,e),l.locationService.push("/playlists")},playlist:s})]})})},y=(0,s.connect)((e=>({navModel:(0,r.h)(e.navIndex,"playlists")})))(m)},"./public/app/features/playlist/PlaylistForm.tsx":(e,a,t)=>{t.d(a,{H:()=>j});var s=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),l=t("./packages/grafana-runtime/src/index.ts"),i=t("./packages/grafana-ui/src/index.ts"),n=t("./packages/grafana-e2e-selectors/src/index.ts"),r=t("./public/app/core/components/TagFilter/TagFilter.tsx"),o=t("./public/app/core/services/search_srv.ts");var c=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),d=t("./public/app/core/components/TagFilter/TagBadge.tsx"),p=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const u=({item:e,onDelete:a,onMoveDown:t,onMoveUp:s,first:l,last:r})=>{const o=(0,i.useStyles)(m);return(0,p.jsxs)("tr",{"aria-label":n.wl.pages.PlaylistForm.itemRow,children:["dashboard_by_id"===e.type?(0,p.jsxs)("td",{className:(0,c.cx)(o.td,o.item),children:[(0,p.jsx)(i.Icon,{name:"apps","aria-label":n.wl.pages.PlaylistForm.itemIdType}),(0,p.jsx)("span",{children:e.title})]}):null,"dashboard_by_tag"===e.type?(0,p.jsxs)("td",{className:(0,c.cx)(o.td,o.item),children:[(0,p.jsx)(i.Icon,{name:"tag-alt","aria-label":n.wl.pages.PlaylistForm.itemTagType}),(0,p.jsx)(d.e,{label:e.title,removeIcon:!1,count:0},e.id)]}):null,(0,p.jsxs)("td",{className:(0,c.cx)(o.td,o.settings),children:[l?null:(0,p.jsx)(i.IconButton,{name:"arrow-up",size:"md",onClick:a=>{a.preventDefault(),s(e)},"aria-label":n.wl.pages.PlaylistForm.itemMoveUp,type:"button"}),r?null:(0,p.jsx)(i.IconButton,{name:"arrow-down",size:"md",onClick:a=>{a.preventDefault(),t(e)},"aria-label":n.wl.pages.PlaylistForm.itemMoveDown,type:"button"}),(0,p.jsx)(i.IconButton,{name:"times",size:"md",onClick:t=>{t.preventDefault(),a(e)},"aria-label":n.wl.pages.PlaylistForm.itemDelete,type:"button"})]})]},e.title)};function m(e){return{td:c.css`
      label: td;
      line-height: 28px;
      max-width: 335px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `,item:c.css`
      label: item;
      span {
        margin-left: ${e.spacing.xs};
      }
    `,settings:c.css`
      label: settings;
      text-align: right;
    `}}var y;const g=({items:e,onMoveUp:a,onMoveDown:t,onDelete:s})=>0===e.length?y||(y=(0,p.jsx)("tr",{children:(0,p.jsx)("td",{children:(0,p.jsx)("em",{children:"Playlist is empty. Add dashboards below."})})})):(0,p.jsx)(p.Fragment,{children:e.map(((l,i)=>{const n=0===i,r=i===e.length-1;return(0,p.jsx)(u,{first:n,last:r,item:l,onDelete:s,onMoveDown:t,onMoveUp:a},l.title)}))});var b;const h=({items:e,onMoveUp:a,onMoveDown:t,onDelete:s})=>(0,p.jsxs)("div",{className:"gf-form-group",children:[b||(b=(0,p.jsx)("h3",{className:"page-headering",children:"Dashboards"})),(0,p.jsx)("table",{className:"filter-table",children:(0,p.jsx)("tbody",{children:(0,p.jsx)(g,{items:e,onMoveUp:a,onMoveDown:t,onDelete:s})})})]});var x,v=t("./public/app/core/components/editors/DashboardPickerByID.tsx");const f=new o.i,j=({onSubmit:e,playlist:a})=>{var t,o;const{name:c,interval:d,items:u}=a,{items:m,addById:y,addByTag:g,deleteItem:b,moveDown:j,moveUp:w}=function(e){const[a,t]=(0,s.useState)(null!=e?e:[]),l=(0,s.useCallback)((e=>{if(!e||a.find((a=>a.id===e.id)))return;const s={id:e.id,title:e.label,type:"dashboard_by_id",value:e.id.toString(10),order:a.length+1};t([...a,s])}),[a]),i=(0,s.useCallback)((e=>{const s=e[0];if(!s||a.find((e=>e.value===s)))return;const l={title:s,type:"dashboard_by_tag",value:s,order:a.length+1};t([...a,l])}),[a]),n=(0,s.useCallback)(((e,s)=>{const l=[...a],i=l.indexOf(e),n=i+s;n>=0&&n<l.length&&(l.splice(i,1),l.splice(n,0,e)),t(l)}),[a]),r=(0,s.useCallback)((e=>{n(e,-1)}),[n]),o=(0,s.useCallback)((e=>{n(e,1)}),[n]),c=(0,s.useCallback)((e=>{t(a.filter((a=>a!==e)))}),[a]);return{items:a,addById:l,addByTag:i,deleteItem:c,moveDown:o,moveUp:r}}(u);return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(i.Form,{onSubmit:a=>e(Object.assign({},a,{items:m})),validateOn:"onBlur",children:({register:e,errors:a})=>{var s,u;const _=0===m.length||Object.keys(a).length>0;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.Field,{label:"Name",invalid:!!a.name,error:null==a||null===(s=a.name)||void 0===s?void 0:s.message,children:(0,p.jsx)(i.Input,Object.assign({type:"text"},e("name",{required:"Name is required"}),{placeholder:"Name",defaultValue:c,"aria-label":n.wl.pages.PlaylistForm.name}))}),(0,p.jsx)(i.Field,{label:"Interval",invalid:!!a.interval,error:null==a||null===(u=a.interval)||void 0===u?void 0:u.message,children:(0,p.jsx)(i.Input,Object.assign({type:"text"},e("interval",{required:"Interval is required"}),{placeholder:"5m",defaultValue:null!=d?d:"5m","aria-label":n.wl.pages.PlaylistForm.interval}))}),t||(t=(0,p.jsx)(h,{items:m,onMoveUp:w,onMoveDown:j,onDelete:b})),(0,p.jsxs)("div",{className:"gf-form-group",children:[x||(x=(0,p.jsx)("h3",{className:"page-headering",children:"Add dashboards"})),o||(o=(0,p.jsx)(i.Field,{label:"Add by title",children:(0,p.jsx)(v.F,{onChange:y,id:"dashboard-picker",isClearable:!0})})),(0,p.jsx)(i.Field,{label:"Add by tag",children:(0,p.jsx)(r.D,{isClearable:!0,tags:[],hideValues:!0,tagOptions:f.getDashboardTags,onChange:g,placeholder:""})})]}),(0,p.jsxs)(i.HorizontalGroup,{children:[(0,p.jsx)(i.Button,{variant:"primary",disabled:_,children:"Save"}),(0,p.jsx)(i.LinkButton,{variant:"secondary",href:`${l.config.appSubUrl}/playlists`,children:"Cancel"})]})]})}})})}},"./public/app/features/playlist/api.ts":(e,a,t)=>{t.d(a,{cg:()=>r,CE:()=>o,l8:()=>c,A5:()=>d,Dv:()=>p});var s=t("./packages/grafana-runtime/src/index.ts"),l=t("./public/app/store/store.ts"),i=t("./public/app/core/actions/index.ts"),n=t("./public/app/core/copy/appNotification.ts");async function r(e){await u((()=>(0,s.getBackendSrv)().post("/api/playlists",e)))}async function o(e,a){await u((()=>(0,s.getBackendSrv)().put(`/api/playlists/${e}`,a)))}async function c(e){await u((()=>(0,s.getBackendSrv)().delete(`/api/playlists/${e}`)),"Playlist deleted")}async function d(e){return await(0,s.getBackendSrv)().get(`/api/playlists/${e}`)}async function p(e){return await(0,s.getBackendSrv)().get("/api/playlists/",{query:e})}async function u(e,a="Playlist saved"){try{await e(),(0,l.WI)((0,i.$l)((0,n.AT)(a)))}catch(e){(0,l.WI)((0,i.$l)((0,n.t_)("Unable to save playlist",e)))}}},"./public/app/features/playlist/styles.ts":(e,a,t)=>{t.d(a,{e:()=>l});var s=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");function l(e){return{description:s.css`
      label: description;
      width: 555px;
      margin-bottom: 20px;
    `,subHeading:s.css`
      label: sub-heading;
      margin-bottom: ${e.spacing(2)};
    `}}},"./public/app/features/playlist/usePlaylist.tsx":(e,a,t)=>{t.d(a,{Z:()=>i});var s=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),l=t("./public/app/features/playlist/api.ts");function i(e){const[a,t]=(0,s.useState)({items:[],interval:"5m",name:""}),[i,n]=(0,s.useState)(!0);return(0,s.useEffect)((()=>{(async()=>{if(!e)return void n(!1);const a=await(0,l.A5)(e);t(a),n(!1)})()}),[e]),{playlist:a,loading:i}}}}]);
//# sourceMappingURL=PlaylistEditPage.1f65f885c5a67f13d9d6.js.map