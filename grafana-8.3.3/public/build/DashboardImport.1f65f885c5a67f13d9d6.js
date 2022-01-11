"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[8808],{"./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx":(e,a,t)=>{t.d(a,{p:()=>z});var r=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),s=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),n=t("./packages/grafana-ui/src/index.ts"),o=t("./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx"),i=t("./packages/grafana-data/src/index.ts"),d=t("./public/app/features/library-panels/components/LibraryPanelsView/actions.ts"),l=t("./.yarn/__virtual__/@reduxjs-toolkit-virtual-5e60bdbc91/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.6.1-a0999c8262-487e340036.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");const c={loadingState:i.LoadingState.Loading,dashboardTitles:[]},p=(0,l.PH)("libraryPanels/delete/searchCompleted"),u=(e=c,a)=>p.match(a)?Object.assign({},e,{dashboardTitles:a.payload.dashboards.map((e=>e.title)),loadingState:i.LoadingState.Done}):e;var m=t("./public/app/features/library-panels/state/api.ts");var h,b,g,x,f=t("./public/app/features/library-panels/styles.ts"),j=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const y=({libraryPanel:e,onDismiss:a,onConfirm:t})=>{const s=(0,n.useStyles)(f.J),[{dashboardTitles:o,loadingState:l},g]=(0,r.useReducer)(u,c),x=(0,r.useMemo)((()=>(0,d.tb)(g)),[g]);(0,r.useEffect)((()=>{x(function(e){return async function(a){const t=await(0,m.E8)(e.uid);a(p({dashboards:t}))}}(e))}),[x,e]);const y=Boolean(o.length),w=l===i.LoadingState.Done;return(0,j.jsxs)(n.Modal,{className:s.modal,title:"Delete library panel",icon:"trash-alt",onDismiss:a,isOpen:!0,children:[w?null:h||(h=(0,j.jsx)(v,{})),w?(0,j.jsxs)("div",{children:[y?(0,j.jsx)(P,{dashboardTitles:o}):null,y?null:b||(b=(0,j.jsx)(S,{})),(0,j.jsxs)(n.Modal.ButtonRow,{children:[(0,j.jsx)(n.Button,{variant:"secondary",onClick:a,fill:"outline",children:"Cancel"}),(0,j.jsx)(n.Button,{variant:"destructive",onClick:t,disabled:y,children:"Delete"})]})]}):null]})},v=()=>g||(g=(0,j.jsx)("span",{children:"Loading library panel..."})),S=()=>{const e=(0,n.useStyles)(f.J);return(0,j.jsx)("div",{className:e.modalText,children:"Do you want to delete this panel?"})},P=({dashboardTitles:e})=>{const a=(0,n.useStyles)(f.J),t=1===e.length?"dashboard.":"dashboards.",r=`${e.length} ${t}`;return 0===e.length?null:(0,j.jsxs)("div",{children:[(0,j.jsxs)("p",{className:a.textInfo,children:["This library panel can not be deleted because it is connected to ",(0,j.jsx)("strong",{children:r})," Remove the library panel from the dashboards listed below and retry."]}),(0,j.jsxs)("table",{className:a.myTable,children:[x||(x=(0,j.jsx)("thead",{children:(0,j.jsx)("tr",{children:(0,j.jsx)("th",{children:"Dashboard name"})})})),(0,j.jsx)("tbody",{children:e.map(((e,a)=>(0,j.jsx)("tr",{children:(0,j.jsx)("td",{children:e})},`dash-title-${a}`)))})]})]})};var w,k,D=t("./packages/grafana-runtime/src/index.ts"),_=t("./public/app/features/panel/components/PanelPluginError.tsx");const z=({libraryPanel:e,onClick:a,onDelete:t,showSecondaryActions:s})=>{var n;const[i,d]=(0,r.useState)(!1),l=null!==(n=D.config.panels[e.model.type])&&void 0!==n?n:(0,_.X)(e.model.type).meta;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(o.X,{isCurrent:!1,title:e.name,description:e.description,plugin:l,onClick:()=>null==a?void 0:a(e),onDelete:s?()=>d(!0):void 0,children:(0,j.jsx)($,{libraryPanel:e})}),i&&(0,j.jsx)(y,{libraryPanel:e,onConfirm:()=>{null==t||t(e),d(!1)},onDismiss:()=>d(!1)})]})};function $({libraryPanel:e}){const a=(0,n.useStyles2)(C);return e.meta.folderUid||e.meta.folderName?e.meta.folderUid?(0,j.jsx)("span",{className:a.metaContainer,children:(0,j.jsxs)(n.Link,{href:`/dashboards/f/${e.meta.folderUid}`,children:[k||(k=(0,j.jsx)(n.Icon,{name:"folder-upload",size:"sm"})),(0,j.jsx)("span",{children:e.meta.folderName})]})}):(0,j.jsxs)("span",{className:a.metaContainer,children:[w||(w=(0,j.jsx)(n.Icon,{name:"folder",size:"sm"})),(0,j.jsx)("span",{children:e.meta.folderName})]}):null}function C(e){return{metaContainer:s.css`
      display: flex;
      align-items: center;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      padding-top: ${e.spacing(.5)};

      svg {
        margin-right: ${e.spacing(.5)};
        margin-bottom: 3px;
      }
    `}}},"./public/app/features/library-panels/components/LibraryPanelsView/actions.ts":(e,a,t)=>{t.d(a,{Xu:()=>g,UO:()=>x,tb:()=>f});var r=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/Subscription.js"),s=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js"),n=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),o=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/observable/merge.js"),i=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/observable/timer.js"),d=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),l=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),c=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),p=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/share.js"),u=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),m=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),h=t("./public/app/features/library-panels/state/api.ts"),b=t("./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts");function g(e){return function(a){const t=new r.w0,g=(0,s.Dp)((0,h.Pq)({searchString:e.searchString,perPage:e.perPage,page:e.page,excludeUid:e.currentPanelId,sortDirection:e.sortDirection,typeFilter:e.panelFilter,folderFilter:e.folderFilter})).pipe((0,d.z)((({perPage:e,elements:a,page:t,totalCount:r})=>(0,n.of)((0,b.zK)({libraryPanels:a,page:t,perPage:e,totalCount:r})))),(0,l.K)((a=>(console.error(a),(0,n.of)((0,b.zK)(Object.assign({},b.p$,{page:e.page,perPage:e.perPage})))))),(0,c.x)((()=>t.unsubscribe())),(0,p.B)());t.add((0,o.T)((0,i.H)(50).pipe((0,u.h)((0,b.xU)()),(0,m.R)(g)),g).subscribe(a))}}function x(e,a){return async function(t){try{await(0,h.UO)(e),g(a)(t)}catch(e){console.error(e)}}}function f(e){return function(a){return a instanceof Function?a(e):e(a)}}},"./public/app/features/library-panels/components/LibraryPanelsView/reducer.ts":(e,a,t)=>{t.d(a,{p$:()=>n,xU:()=>o,zK:()=>i,oO:()=>d,_p:()=>l});var r=t("./.yarn/__virtual__/@reduxjs-toolkit-virtual-5e60bdbc91/3/opt/drone/yarncache/@reduxjs-toolkit-npm-1.6.1-a0999c8262-487e340036.zip/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js"),s=t("./packages/grafana-data/src/index.ts");const n={loadingState:s.LoadingState.Loading,libraryPanels:[],totalCount:0,perPage:40,page:1,numberOfPages:0,currentPanelId:void 0},o=(0,r.PH)("libraryPanels/view/initSearch"),i=(0,r.PH)("libraryPanels/view/searchCompleted"),d=(0,r.PH)("libraryPanels/view/changePage"),l=(e,a)=>{if(o.match(a))return Object.assign({},e,{loadingState:s.LoadingState.Loading});if(i.match(a)){const{libraryPanels:t,page:r,perPage:n,totalCount:o}=a.payload,i=Math.ceil(o/n);return Object.assign({},e,{libraryPanels:t,perPage:n,totalCount:o,loadingState:s.LoadingState.Done,numberOfPages:i,page:r>i?r-1:r})}return d.match(a)?Object.assign({},e,{page:a.payload.page}):e}},"./public/app/features/library-panels/styles.ts":(e,a,t)=>{t.d(a,{J:()=>s});var r=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js");function s(e){return{myTable:r.css`
      max-height: 204px;
      overflow-y: auto;
      margin-top: 11px;
      margin-bottom: 28px;
      border-radius: ${e.border.radius.sm};
      border: 1px solid ${e.colors.bg3};
      background: ${e.colors.bg1};
      color: ${e.colors.textSemiWeak};
      font-size: ${e.typography.size.md};
      width: 100%;

      thead {
        color: #538ade;
        font-size: ${e.typography.size.sm};
      }

      th,
      td {
        padding: 6px 13px;
        height: ${e.spacing.xl};
      }

      tbody > tr:nth-child(odd) {
        background: ${e.colors.bg2};
      }
    `,noteTextbox:r.css`
      margin-bottom: ${e.spacing.xl};
    `,textInfo:r.css`
      color: ${e.colors.textSemiWeak};
      font-size: ${e.typography.size.sm};
    `,dashboardSearch:r.css`
      margin-top: ${e.spacing.md};
    `,modal:r.css`
      width: 500px;
    `,modalText:r.css`
      font-size: ${e.typography.heading.h4};
      color: ${e.colors.link};
      margin-bottom: calc(${e.spacing.d} * 2);
      padding-top: ${e.spacing.d};
    `}}},"./public/app/features/manage-dashboards/DashboardImportPage.tsx":(e,a,t)=>{t.r(a),t.d(a,{default:()=>H});var r=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),s=t("./.yarn/__virtual__/react-redux-virtual-8e30c710ae/3/opt/drone/yarncache/react-redux-npm-7.2.5-cf7e365145-04ac4a4178.zip/node_modules/react-redux/es/index.js"),n=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=t("./packages/grafana-data/src/index.ts"),i=t("./packages/grafana-e2e-selectors/src/index.ts"),d=t("./packages/grafana-ui/src/index.ts"),l=t("./public/app/core/components/Page/Page.tsx"),c=t("./packages/grafana-runtime/src/index.ts"),p=t("./public/app/core/components/Select/FolderPicker.tsx"),u=t("./public/app/features/manage-dashboards/state/reducers.ts"),m=t("./public/app/features/manage-dashboards/services/ValidationSrv.ts");const h=e=>{try{return JSON.parse(e),!0}catch(e){return"Not valid JSON"}},b=e=>{const a=/(^\d+$)|dashboards\/(\d+)/.exec(e);return!(!a||!a[1]&&!a[2])||"Could not find a valid Grafana.com ID"},g=e=>(0,c.getBackendSrv)().get(`/api/dashboards/uid/${e}`).then((e=>`Dashboard named '${null==e?void 0:e.dashboard.title}' in folder '${null==e?void 0:e.meta.folderTitle}' has the same UID`)).catch((e=>(e.isHandled=!0,!0)));var x=t("./public/app/features/library-panels/components/LibraryPanelCard/LibraryPanelCard.tsx"),f=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");function j({inputs:e,label:a,description:t,folderName:r}){const s=(0,d.useStyles2)(y);return Boolean(null==e?void 0:e.length)?(0,f.jsx)("div",{className:s.spacer,children:(0,f.jsx)(d.Field,{label:a,description:t,children:(0,f.jsx)(f.Fragment,{children:e.map(((e,a)=>{const t=`elements[${a}]`,n=e.state===u.KQ.New?Object.assign({},e.model,{meta:Object.assign({},e.model.meta,{folderName:null!=r?r:"General"})}):Object.assign({},e.model);return(0,f.jsx)("div",{className:s.item,children:(0,f.jsx)(x.p,{libraryPanel:n,onClick:()=>{}})},t)}))})})}):null}function y(e){return{spacer:n.css`
      margin-bottom: ${e.spacing(2)};
    `,item:n.css`
      margin-bottom: ${e.spacing(1)};
    `}}const v=["ref"],S=["ref"];var P;function w(e,a){if(null==e)return{};var t,r,s={},n=Object.keys(e);for(r=0;r<n.length;r++)t=n[r],a.indexOf(t)>=0||(s[t]=e[t]);return s}const k=({register:e,errors:a,control:t,getValues:s,uidReset:n,inputs:o,initialFolderId:l,onUidReset:h,onCancel:b,onSubmit:x,watch:y})=>{var k,z,$,C;const[I,N]=(0,r.useState)(!1),F=y("dataSources"),O=y("folder");(0,r.useEffect)((()=>{I&&(a.title||a.uid)&&x(s(),{})}),[a,s,I,x]);const L=null!==(k=null==o||null===(z=o.libraryPanels)||void 0===z?void 0:z.filter((e=>e.state===u.KQ.New)))&&void 0!==k?k:[],T=null!==($=null==o||null===(C=o.libraryPanels)||void 0===C?void 0:C.filter((e=>e.state===u.KQ.Exits)))&&void 0!==$?$:[];return(0,f.jsxs)(f.Fragment,{children:[P||(P=(0,f.jsx)(d.Legend,{children:"Options"})),(0,f.jsx)(d.Field,{label:"Name",invalid:!!a.title,error:a.title&&a.title.message,children:(0,f.jsx)(d.Input,Object.assign({},e("title",{required:"Name is required",validate:async e=>{return await(a=e,t=s().folder.id,m.t.validateNewDashboardName(t,a).then((()=>!0)).catch((e=>{if("EXISTING"===e.type)return e.message})));var a,t}}),{type:"text","data-testid":i.wl.components.ImportDashboardForm.name}))}),(0,f.jsx)(d.Field,{label:"Folder",children:(0,f.jsx)(d.InputControl,{render:e=>{let{}=e,a=w(e.field,v);return(0,f.jsx)(p.E,Object.assign({},a,{enableCreateNew:!0,initialFolderId:l}))},name:"folder",control:t})}),(0,f.jsx)(d.Field,{label:"Unique identifier (UID)",description:"The unique identifier (UID) of a dashboard can be used for uniquely identify a dashboard between multiple Grafana installs. The UID allows having consistent URLs for accessing dashboards so changing the title of a dashboard will not break any bookmarked links to that dashboard.",invalid:!!a.uid,error:a.uid&&a.uid.message,children:(0,f.jsx)(f.Fragment,{children:n?(0,f.jsx)(d.Input,Object.assign({},e("uid",{required:!0,validate:async e=>await g(e)}))):(0,f.jsx)(d.Input,Object.assign({disabled:!0},e("uid",{validate:async e=>await g(e)}),{addonAfter:!n&&(0,f.jsx)(d.Button,{onClick:h,children:"Change uid"})}))})}),o.dataSources&&o.dataSources.map(((e,r)=>{const s=`dataSources[${r}]`,n=null!=F?F:[];return(0,f.jsx)(d.Field,{label:e.label,invalid:a.dataSources&&!!a.dataSources[r],error:a.dataSources&&a.dataSources[r]&&"A data source is required",children:(0,f.jsx)(d.InputControl,{name:s,render:a=>{var t;let{}=a,s=w(a.field,S);return(0,f.jsx)(c.DataSourcePicker,Object.assign({},s,{noDefault:!0,placeholder:e.info,pluginId:e.pluginId,current:null===(t=n[r])||void 0===t?void 0:t.name}))},control:t,rules:{required:!0}})},s)})),o.constants&&o.constants.map(((t,r)=>{const s=`constants[${r}]`;return(0,f.jsx)(d.Field,{label:t.label,error:a.constants&&a.constants[r]&&`${t.label} needs a value`,invalid:a.constants&&!!a.constants[r],children:(0,f.jsx)(d.Input,Object.assign({},e(s,{required:!0}),{defaultValue:t.value}))},s)})),(0,f.jsx)(j,{inputs:L,label:"New library panels",description:"List of new library panels that will get imported.",folderName:O.title}),(0,f.jsx)(j,{inputs:T,label:"Existing library panels",description:"List of existing library panels. These panels are not affected by the import.",folderName:O.title}),(0,f.jsxs)(d.HorizontalGroup,{children:[(0,f.jsx)(d.Button,{type:"submit","data-testid":i.wl.components.ImportDashboardForm.submit,variant:D(a),onClick:()=>{N(!0)},children:_(a)}),(0,f.jsx)(d.Button,{type:"reset",variant:"secondary",onClick:b,children:"Cancel"})]})]})};function D(e){return e&&(e.title||e.uid)?"destructive":"primary"}function _(e){return e&&(e.title||e.uid)?"Import (Overwrite)":"Import"}var z,$,C=t("./public/app/features/manage-dashboards/state/actions.ts");function I(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}const N={clearLoadedDashboard:C.ys,importDashboard:C.$j},F=(0,s.connect)((e=>{const a=c.locationService.getSearchObject();return{dashboard:e.importDashboard.dashboard,meta:e.importDashboard.meta,source:e.importDashboard.source,inputs:e.importDashboard.inputs,folder:a.folderId?{id:Number(a.folderId)}:{id:0}}}),N);class O extends r.PureComponent{constructor(...e){super(...e),I(this,"state",{uidReset:!1}),I(this,"onSubmit",(e=>{this.props.importDashboard(e)})),I(this,"onCancel",(()=>{this.props.clearLoadedDashboard()})),I(this,"onUidReset",(()=>{this.setState({uidReset:!0})}))}render(){const{dashboard:e,inputs:a,meta:t,source:r,folder:s}=this.props,{uidReset:n}=this.state;return(0,f.jsxs)(f.Fragment,{children:[r===u.G7.Gcom&&(0,f.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,f.jsx)("div",{children:(0,f.jsxs)(d.Legend,{children:["Importing dashboard from"," ",(0,f.jsx)("a",{href:`https://grafana.com/dashboards/${e.gnetId}`,className:"external-link",target:"_blank",rel:"noreferrer",children:"Grafana.com"})]})}),(0,f.jsx)("table",{className:"filter-table form-inline",children:(0,f.jsxs)("tbody",{children:[(0,f.jsxs)("tr",{children:[z||(z=(0,f.jsx)("td",{children:"Published by"})),(0,f.jsx)("td",{children:t.orgName})]}),(0,f.jsxs)("tr",{children:[$||($=(0,f.jsx)("td",{children:"Updated on"})),(0,f.jsx)("td",{children:(0,o.dateTimeFormat)(t.updatedAt)})]})]})})]}),(0,f.jsx)(d.Form,{onSubmit:this.onSubmit,defaultValues:Object.assign({},e,{constants:[],dataSources:[],elements:[],folder:s}),validateOnMount:!0,validateFieldsOnMount:["title","uid"],validateOn:"onChange",children:({register:e,errors:t,control:r,watch:o,getValues:i})=>(0,f.jsx)(k,{register:e,errors:t,control:r,getValues:i,uidReset:n,inputs:a,onCancel:this.onCancel,onUidReset:this.onUidReset,onSubmit:this.onSubmit,watch:o,initialFolderId:s.id})})]})}}const L=F(O);L.displayName="ImportDashboardOverview";var T,U,J,B=t("./public/app/core/app_events.ts"),R=t("./public/app/core/selectors/navModel.ts"),G=t("./public/app/core/actions/cleanUp.ts");function V(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}const q={fetchGcomDashboard:C.q_,importDashboardJson:C.nQ,cleanUpAction:G.e},A=(0,s.connect)((e=>({navModel:(0,R.h)(e.navIndex,"import",void 0,!0),loadingState:e.importDashboard.state})),q);class E extends r.PureComponent{constructor(e){super(e),V(this,"onFileUpload",(e=>{const{importDashboardJson:a}=this.props,t=e.currentTarget.files&&e.currentTarget.files.length>0&&e.currentTarget.files[0];if(t){const e=new FileReader,r=()=>e=>{let t;try{t=JSON.parse(e.target.result)}catch(e){return void B.Z.emit(o.AppEvents.alertError,["Import failed","JSON -> JS Serialization failed: "+e.message])}a(t)};e.onload=r(),e.readAsText(t)}})),V(this,"getDashboardFromJson",(e=>{this.props.importDashboardJson(JSON.parse(e.dashboardJson))})),V(this,"getGcomDashboard",(e=>{let a;const t=/(^\d+$)|dashboards\/(\d+)/.exec(e.gcomDashboard);t&&t[1]?a=t[1]:t&&t[2]&&(a=t[2]),a&&this.props.fetchGcomDashboard(a)}));const{gcomDashboardId:a}=this.props.queryParams;a&&this.getGcomDashboard({gcomDashboard:a})}componentWillUnmount(){this.props.cleanUpAction({stateSelector:e=>e.importDashboard})}renderImportForm(){const e=K(this.props.theme);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:e.option,children:(0,f.jsx)(d.FileUpload,{accept:"application/json",onFileUpload:this.onFileUpload,children:"Upload JSON file"})}),(0,f.jsx)("div",{className:e.option,children:(0,f.jsx)(d.Form,{onSubmit:this.getGcomDashboard,defaultValues:{gcomDashboard:""},children:({register:e,errors:a})=>(0,f.jsx)(d.Field,{label:"Import via grafana.com",invalid:!!a.gcomDashboard,error:a.gcomDashboard&&a.gcomDashboard.message,children:(0,f.jsx)(d.Input,Object.assign({id:"url-input",placeholder:"Grafana.com dashboard URL or ID",type:"text"},e("gcomDashboard",{required:"A Grafana dashboard URL or ID is required",validate:b}),{addonAfter:T||(T=(0,f.jsx)(d.Button,{type:"submit",children:"Load"}))}))})})}),(0,f.jsx)("div",{className:e.option,children:(0,f.jsx)(d.Form,{onSubmit:this.getDashboardFromJson,defaultValues:{dashboardJson:""},children:({register:e,errors:a})=>(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(d.Field,{label:"Import via panel json",invalid:!!a.dashboardJson,error:a.dashboardJson&&a.dashboardJson.message,children:(0,f.jsx)(d.TextArea,Object.assign({},e("dashboardJson",{required:"Need a dashboard JSON model",validate:h}),{"data-testid":i.wl.components.DashboardImportPage.textarea,id:"dashboard-json-textarea",rows:10}))}),(0,f.jsx)(d.Button,{type:"submit","data-testid":i.wl.components.DashboardImportPage.submit,children:"Load"})]})})})]})}render(){const{loadingState:e,navModel:a}=this.props;return(0,f.jsx)(l.Z,{navModel:a,children:(0,f.jsxs)(l.Z.Contents,{children:[e===o.LoadingState.Loading&&(U||(U=(0,f.jsx)(d.VerticalGroup,{justify:"center",children:(0,f.jsx)(d.HorizontalGroup,{justify:"center",children:(0,f.jsx)(d.Spinner,{size:32})})}))),[o.LoadingState.Error,o.LoadingState.NotStarted].includes(e)&&this.renderImportForm(),e===o.LoadingState.Done&&(J||(J=(0,f.jsx)(L,{})))]})})}}const M=A((0,d.withTheme2)(E));M.displayName="DashboardImport";const H=M,K=(0,d.stylesFactory)((e=>({option:n.css`
      margin-bottom: ${e.spacing(4)};
    `})))},"./public/app/features/panel/components/VizTypePicker/PanelTypeCard.tsx":(e,a,t)=>{t.d(a,{X:()=>l});t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js");var r=t("./packages/grafana-data/src/index.ts"),s=t("./packages/grafana-ui/src/index.ts"),n=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=t("./packages/grafana-e2e-selectors/src/index.ts"),i=t("./public/app/features/plugins/components/PluginStateInfo.tsx"),d=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const l=({isCurrent:e,title:a,plugin:t,onClick:i,onDelete:l,disabled:u,showBadge:m,description:h,children:b})=>{const g=(0,s.useStyles2)(c),x=(0,n.cx)({[g.item]:!0,[g.disabled]:u||t.state===r.PluginState.deprecated,[g.current]:e});return(0,d.jsxs)("div",{className:x,"aria-label":o.wl.components.PluginVisualization.item(t.name),onClick:u?void 0:i,title:e?"Click again to close this section":t.name,children:[(0,d.jsx)("img",{className:g.img,src:t.info.logos.small,alt:""}),(0,d.jsxs)("div",{className:g.itemContent,children:[(0,d.jsx)("div",{className:g.name,children:a}),h?(0,d.jsx)("span",{className:g.description,children:h}):null,b]}),m&&(0,d.jsx)("div",{className:(0,n.cx)(g.badge,u&&g.disabled),children:(0,d.jsx)(p,{plugin:t})}),l&&(0,d.jsx)(s.IconButton,{name:"trash-alt",onClick:e=>{e.stopPropagation(),l()},"aria-label":"Delete button on panel type card"})]})};l.displayName="PanelTypeCard";const c=e=>({item:n.css`
      position: relative;
      display: flex;
      flex-shrink: 0;
      cursor: pointer;
      background: ${e.colors.background.secondary};
      border-radius: ${e.shape.borderRadius()};
      box-shadow: ${e.shadows.z1};
      border: 1px solid ${e.colors.background.secondary};
      align-items: center;
      padding: 8px;
      width: 100%;
      position: relative;
      overflow: hidden;
      transition: ${e.transitions.create(["background"],{duration:e.transitions.duration.short})};

      &:hover {
        background: ${e.colors.emphasize(e.colors.background.secondary,.03)};
      }
    `,itemContent:n.css`
      position: relative;
      width: 100%;
      padding: ${e.spacing(0,1)};
    `,current:n.css`
      label: currentVisualizationItem;
      border: 1px solid ${e.colors.primary.border};
      background: ${e.colors.action.selected};
    `,disabled:n.css`
      opacity: 0.2;
      filter: grayscale(1);
      cursor: default;
      pointer-events: none;
    `,name:n.css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: ${e.typography.size.sm};
      font-weight: ${e.typography.fontWeightMedium};
      width: 100%;
    `,description:n.css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: ${e.colors.text.secondary};
      font-size: ${e.typography.bodySmall.fontSize};
      font-weight: ${e.typography.fontWeightLight};
      width: 100%;
    `,img:n.css`
      max-height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
    `,badge:n.css`
      background: ${e.colors.background.primary};
    `}),p=({plugin:e})=>(0,r.isUnsignedPluginSignature)(e.signature)?(0,d.jsx)(s.PluginSignatureBadge,{status:e.signature}):(0,d.jsx)(i.u,{state:e.state});p.displayName="PanelPluginBadge"},"./public/app/features/plugins/components/PluginStateInfo.tsx":(e,a,t)=>{t.d(a,{u:()=>o});t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js");var r=t("./packages/grafana-ui/src/index.ts"),s=t("./packages/grafana-data/src/index.ts"),n=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const o=e=>{const a=function(e){switch(e){case s.PluginState.deprecated:return{text:"Deprecated",color:"red",tooltip:"This feature is deprecated and will be removed in a future release"};case s.PluginState.alpha:return{text:"Alpha",color:"blue",tooltip:"This feature is experimental and future updates might not be backward compatible"};case s.PluginState.beta:return{text:"Beta",color:"blue",tooltip:"This feature is close to complete but not fully tested"};default:return null}}(e.state);return a?(0,n.jsx)(r.Badge,{color:a.color,title:a.tooltip,text:a.text,icon:a.icon}):null}}}]);
//# sourceMappingURL=DashboardImport.1f65f885c5a67f13d9d6.js.map