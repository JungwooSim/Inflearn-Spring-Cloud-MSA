"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[9218],{"./public/app/core/components/PageActionBar/PageActionBar.tsx":(e,a,t)=>{t.d(a,{Z:()=>l});var s=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),n=t("./packages/grafana-ui/src/index.ts"),i=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");class l extends s.PureComponent{render(){const{searchQuery:e,linkButton:a,setSearchQuery:t,target:s,placeholder:l="Search by name or type"}=this.props,r={href:null==a?void 0:a.href,disabled:null==a?void 0:a.disabled};return s&&(r.target=s),(0,i.jsxs)("div",{className:"page-action-bar",children:[(0,i.jsx)("div",{className:"gf-form gf-form--grow",children:(0,i.jsx)(n.FilterInput,{value:e,onChange:t,placeholder:l})}),a&&(0,i.jsx)(n.LinkButton,Object.assign({},r,{children:a.title}))]})}}},"./public/app/features/playlist/PlaylistPage.tsx":(e,a,t)=>{t.r(a),t.d(a,{PlaylistPage:()=>S,default:()=>_});var s=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),n=t("./.yarn/__virtual__/react-redux-virtual-8e30c710ae/3/opt/drone/yarncache/react-redux-npm-7.2.5-cf7e365145-04ac4a4178.zip/node_modules/react-redux/es/index.js"),i=t("./public/app/core/components/Page/Page.tsx"),l=t("./public/app/core/selectors/navModel.ts"),r=t("./.yarn/__virtual__/react-use-virtual-ca2705900f/3/opt/drone/yarncache/react-use-npm-17.2.4-c702db5427-3c885c3798.zip/node_modules/react-use/esm/useDebounce.js"),o=t("./packages/grafana-ui/src/index.ts"),c=t("./public/app/core/components/PageActionBar/PageActionBar.tsx"),p=t("./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx"),d=t("./public/app/features/playlist/api.ts"),u=t("./packages/grafana-data/src/index.ts"),y=t("./packages/grafana-runtime/src/index.ts"),h=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const m=({playlist:e,onDismiss:a})=>{const[t,n]=(0,s.useState)(!1),[i,l]=(0,s.useState)(!1);return(0,h.jsxs)(o.Modal,{isOpen:!0,icon:"play",title:"Start playlist",onDismiss:a,children:[(0,h.jsxs)(o.VerticalGroup,{children:[(0,h.jsx)(o.Field,{label:"Mode",children:(0,h.jsx)(o.RadioButtonGroup,{value:t,options:[{label:"Normal",value:!1},{label:"TV",value:"tv"},{label:"Kiosk",value:!0}],onChange:n})}),(0,h.jsx)(o.Checkbox,{label:"Autofit",description:"Panel heights will be adjusted to fit screen size",name:"autofix",value:i,onChange:e=>l(e.currentTarget.checked)})]}),(0,h.jsx)(o.Modal.ButtonRow,{children:(0,h.jsxs)(o.Button,{variant:"primary",onClick:()=>{const a={};t&&(a.kiosk=t),i&&(a.autofitpanels=!0),y.locationService.push(u.urlUtil.renderUrl(`/playlists/play/${e.id}`,a))},children:["Start ",e.name]})})]})};var g=t("./public/app/core/services/context_srv.ts");const f=({playlists:e,setStartPlaylist:a,setPlaylistToDelete:t})=>(0,h.jsx)(h.Fragment,{children:e.map((e=>(0,h.jsx)(o.Card,{heading:e.name,children:(0,h.jsxs)(o.Card.Actions,{children:[(0,h.jsx)(o.Button,{variant:"secondary",icon:"play",onClick:()=>a(e),children:"Start playlist"}),g.Vt.isEditor&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.LinkButton,{variant:"secondary",href:`/playlists/edit/${e.id}`,icon:"cog",children:"Edit playlist"},"edit"),(0,h.jsx)(o.Button,{disabled:!1,onClick:()=>t({id:e.id,name:e.name}),icon:"trash-alt",variant:"destructive",children:"Delete playlist"})]})]})},e.id.toString())))});var x=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");const v=()=>{const e=(0,o.useStyles2)(b);return(0,h.jsx)("div",{className:e.noResult,children:"No playlist found!"})},b=e=>({noResult:x.css`
      padding: ${e.spacing(2)};
      background: ${e.colors.secondary.main};
      font-style: italic;
      margin-top: ${e.spacing(2)};
    `});var j,k;const S=({navModel:e})=>{const[a,t]=(0,s.useState)(""),[n,l]=(0,s.useState)(a),[u,y]=(0,s.useState)(!1),[g,x]=(0,s.useState)(),[b,S]=(0,s.useState)(),[_,B]=(0,s.useState)(0),[C,P]=(0,s.useState)([]);(0,r.Z)((async()=>{const e=await(0,d.Dv)(a);u||y(!0),P(e),l(a)}),350,[_,a]);const w=C&&C.length>0,T=j||(j=(0,h.jsx)(p.Z,{title:"There are no playlists created yet",buttonIcon:"plus",buttonLink:"playlists/new",buttonTitle:"Create Playlist",proTip:"You can use playlists to cycle dashboards on TVs without user control",proTipLink:"http://docs.grafana.org/reference/playlist/",proTipLinkTitle:"Learn more",proTipTarget:"_blank"})),A=C.length>0||a.length>0||n.length>0;return(0,h.jsx)(i.Z,{navModel:e,children:(0,h.jsxs)(i.Z.Contents,{isLoading:!u,children:[A&&(0,h.jsx)(c.Z,{searchQuery:a,linkButton:{title:"New playlist",href:"/playlists/new"},setSearchQuery:t}),!w&&a?k||(k=(0,h.jsx)(v,{})):(0,h.jsx)(f,{playlists:C,setStartPlaylist:x,setPlaylistToDelete:S}),!A&&T,b&&(0,h.jsx)(o.ConfirmModal,{title:b.name,confirmText:"Delete",body:`Are you sure you want to delete '${b.name}' playlist?`,onConfirm:()=>{b&&(0,d.l8)(b.id).finally((()=>{B(_+1),S(void 0)}))},isOpen:Boolean(b),onDismiss:()=>S(void 0)}),g&&(0,h.jsx)(m,{playlist:g,onDismiss:()=>x(void 0)})]})})},_=(0,n.connect)((e=>({navModel:(0,l.h)(e.navIndex,"playlists")})))(S)},"./public/app/features/playlist/api.ts":(e,a,t)=>{t.d(a,{cg:()=>r,CE:()=>o,l8:()=>c,A5:()=>p,Dv:()=>d});var s=t("./packages/grafana-runtime/src/index.ts"),n=t("./public/app/store/store.ts"),i=t("./public/app/core/actions/index.ts"),l=t("./public/app/core/copy/appNotification.ts");async function r(e){await u((()=>(0,s.getBackendSrv)().post("/api/playlists",e)))}async function o(e,a){await u((()=>(0,s.getBackendSrv)().put(`/api/playlists/${e}`,a)))}async function c(e){await u((()=>(0,s.getBackendSrv)().delete(`/api/playlists/${e}`)),"Playlist deleted")}async function p(e){return await(0,s.getBackendSrv)().get(`/api/playlists/${e}`)}async function d(e){return await(0,s.getBackendSrv)().get("/api/playlists/",{query:e})}async function u(e,a="Playlist saved"){try{await e(),(0,n.WI)((0,i.$l)((0,l.AT)(a)))}catch(e){(0,n.WI)((0,i.$l)((0,l.t_)("Unable to save playlist",e)))}}}}]);
//# sourceMappingURL=PlaylistPage.1f65f885c5a67f13d9d6.js.map