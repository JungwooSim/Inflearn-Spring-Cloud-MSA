(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1557],{"./public/app/core/components/NodeGraphSettings.tsx":(e,t,n)=>{"use strict";n.d(t,{n:()=>l});n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js");var a,r=n("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=n("./packages/grafana-data/src/index.ts"),s=n("./packages/grafana-ui/src/index.ts"),i=n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");function l({options:e,onOptionsChange:t}){var n;const r=(0,s.useStyles)(d);return(0,i.jsxs)("div",{className:r.container,children:[a||(a=(0,i.jsx)("h3",{className:"page-heading",children:"Node Graph"})),(0,i.jsx)(s.InlineFieldRow,{className:r.row,children:(0,i.jsx)(s.InlineField,{tooltip:"Enables the Node Graph visualization in the trace viewer.",label:"Enable Node Graph",labelWidth:26,children:(0,i.jsx)(s.InlineSwitch,{value:null===(n=e.jsonData.nodeGraph)||void 0===n?void 0:n.enabled,onChange:n=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"nodeGraph",Object.assign({},e.jsonData.nodeGraph,{enabled:n.currentTarget.checked}))})})})]})}const d=e=>({container:r.css`
    label: container;
    width: 100%;
  `,row:r.css`
    label: row;
    align-items: baseline;
  `})},"./public/app/core/components/TraceToLogsSettings.tsx":(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var a,r=n("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=n("./packages/grafana-data/src/index.ts"),s=n("./packages/grafana-runtime/src/index.ts"),i=n("./packages/grafana-ui/src/index.ts"),l=(n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js"));function d({options:e,onOptionsChange:t}){var n,d,p,u,m,h,g;const f=(0,i.useStyles)(c);return(0,l.jsxs)("div",{className:(0,r.css)({width:"100%"}),children:[a||(a=(0,l.jsx)("h3",{className:"page-heading",children:"Trace to logs"})),(0,l.jsx)("div",{className:f.infoText,children:"Trace to logs let's you navigate from a trace span to the selected data source's log."}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{tooltip:"The data source the trace is going to navigate to",label:"Data source",labelWidth:26,children:(0,l.jsx)(s.DataSourcePicker,{pluginId:"loki",current:null===(n=e.jsonData.tracesToLogs)||void 0===n?void 0:n.datasourceUid,noDefault:!0,width:40,onChange:n=>{var a;return(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",{datasourceUid:n.uid,tags:null===(a=e.jsonData.tracesToLogs)||void 0===a?void 0:a.tags})}})})}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{tooltip:"Tags that will be used in the Loki query. Default tags: 'cluster', 'hostname', 'namespace', 'pod'",label:"Tags",labelWidth:26,children:(0,l.jsx)(i.TagsInput,{tags:null===(d=e.jsonData.tracesToLogs)||void 0===d?void 0:d.tags,width:40,onChange:n=>{var a;return(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",{datasourceUid:null===(a=e.jsonData.tracesToLogs)||void 0===a?void 0:a.datasourceUid,tags:n})}})})}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{label:"Span start time shift",labelWidth:26,grow:!0,tooltip:"Shifts the start time of the span. Default 0 (Time units can be used here, for example: 5s, 1m, 3h)",children:(0,l.jsx)(i.Input,{type:"text",placeholder:"1h",width:40,onChange:n=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{spanStartTimeShift:n.currentTarget.value})),value:(null===(p=e.jsonData.tracesToLogs)||void 0===p?void 0:p.spanStartTimeShift)||""})})}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{label:"Span end time shift",labelWidth:26,grow:!0,tooltip:"Shifts the end time of the span. Default 0 Time units can be used here, for example: 5s, 1m, 3h",children:(0,l.jsx)(i.Input,{type:"text",placeholder:"1h",width:40,onChange:n=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{spanEndTimeShift:n.currentTarget.value})),value:(null===(u=e.jsonData.tracesToLogs)||void 0===u?void 0:u.spanEndTimeShift)||""})})}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{label:"Filter by Trace ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Trace ID. Appends '|=<trace id>' to the query.",children:(0,l.jsx)(i.InlineSwitch,{value:null===(m=e.jsonData.tracesToLogs)||void 0===m?void 0:m.filterByTraceID,onChange:n=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{filterByTraceID:n.currentTarget.checked}))})})}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{label:"Filter by Span ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Span ID. Appends '|=<span id>' to the query.",children:(0,l.jsx)(i.InlineSwitch,{value:null===(h=e.jsonData.tracesToLogs)||void 0===h?void 0:h.filterBySpanID,onChange:n=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{filterBySpanID:n.currentTarget.checked}))})})}),(0,l.jsx)(i.InlineFieldRow,{children:(0,l.jsx)(i.InlineField,{label:"Loki Search",labelWidth:26,grow:!0,tooltip:"Use this logs data source to search for traces.",children:(0,l.jsx)(i.InlineSwitch,{defaultChecked:!0,value:null===(g=e.jsonData.tracesToLogs)||void 0===g?void 0:g.lokiSearch,onChange:n=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:t,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{lokiSearch:n.currentTarget.checked}))})})})]})}const c=e=>({infoText:r.css`
    padding-bottom: ${e.spacing.md};
    color: ${e.colors.textSemiWeak};
  `})},"./public/app/core/utils/tracing.ts":(e,t,n)=>{"use strict";n.d(t,{et:()=>r,nO:()=>o,fy:()=>s,np:()=>l});var a=n("./packages/grafana-data/src/index.ts");function r(e){e.sort(((e,t)=>e[0]-t[0]));return e.reduce(((e,t)=>{if(!e.length)return[t];const n=e.slice(-1)[0],[a,r]=n,[o,s]=t;return s<r?e:o>r?[...e,t]:[...e.slice(0,-1),[a,s]]}),[]).reduce(((e,t)=>e+(t[1]-t[0])),0)}function o(e){const t={};let n;for(let a=0;n=e(a),n;a++){t[n.id]?t[n.id].span=n.span:t[n.id]={span:n.span,children:[]};for(const e of n.parentIds)e&&(t[e]?t[e].children.push(n.id):t[e]={span:void 0,children:[n.id]})}return t}function s(e,t,n){return{main:`${i(e)}ms (${i(e/t*100)}%)`,secondary:`${i(n)}ms (${i(n/e*100)}%)`}}function i(e){return parseFloat(e.toFixed(2))}function l(){return[new a.MutableDataFrame({fields:[{name:a.NodeGraphDataFrameFieldNames.id,type:a.FieldType.string},{name:a.NodeGraphDataFrameFieldNames.title,type:a.FieldType.string},{name:a.NodeGraphDataFrameFieldNames.subTitle,type:a.FieldType.string},{name:a.NodeGraphDataFrameFieldNames.mainStat,type:a.FieldType.string,config:{displayName:"Total time (% of trace)"}},{name:a.NodeGraphDataFrameFieldNames.secondaryStat,type:a.FieldType.string,config:{displayName:"Self time (% of total)"}},{name:a.NodeGraphDataFrameFieldNames.color,type:a.FieldType.number,config:{color:{mode:"continuous-GrYlRd"},displayName:"Self time / Trace duration"}}],meta:{preferredVisualisationType:"nodeGraph"}}),new a.MutableDataFrame({fields:[{name:a.NodeGraphDataFrameFieldNames.id,type:a.FieldType.string},{name:a.NodeGraphDataFrameFieldNames.target,type:a.FieldType.string},{name:a.NodeGraphDataFrameFieldNames.source,type:a.FieldType.string}],meta:{preferredVisualisationType:"nodeGraph"}})]}},"./public/app/plugins/datasource/jaeger/module.ts":(e,t,n)=>{"use strict";n.r(t),n.d(t,{plugin:()=>k});var a=n("./packages/grafana-data/src/index.ts"),r=n("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),o=n("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),s=n("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),i=n("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),l=n("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),d=n("./packages/grafana-runtime/src/index.ts"),c=n("./public/app/core/utils/fetch.ts"),p=n("./public/app/features/dashboard/services/TimeSrv.ts"),u=n("./public/app/plugins/datasource/jaeger/responseTransform.ts"),m=n("./public/app/core/utils/tracing.ts");function h(e){const{nodes:t,edges:n}=function(e){const t=[],n=[],r=function(e){let t=0,n=1/0;for(const a of e)a.startTime<n&&(n=a.startTime),a.startTime+a.duration>t&&(t=a.startTime+a.duration);return t-n}(e.spans),o=(0,m.nO)((t=>{var n;if(t>=e.spans.length)return;const a=e.spans[t];return{span:a,id:a.spanID,parentIds:(null===(n=a.references)||void 0===n?void 0:n.filter((e=>"CHILD_OF"===e.refType)).map((e=>e.spanID)))||[]}}));for(const d of e.spans){var s,i,l;const c=e.processes[d.processID],p=o[d.spanID].children.map((e=>{const t=o[e].span;return[t.startTime,t.startTime+t.duration]})),u=(0,m.et)(p),h=d.duration-u,g=(0,m.fy)(d.duration/1e3,r/1e3,h/1e3);t.push({[a.NodeGraphDataFrameFieldNames.id]:d.spanID,[a.NodeGraphDataFrameFieldNames.title]:null!==(s=null==c?void 0:c.serviceName)&&void 0!==s?s:"",[a.NodeGraphDataFrameFieldNames.subTitle]:d.operationName,[a.NodeGraphDataFrameFieldNames.mainStat]:g.main,[a.NodeGraphDataFrameFieldNames.secondaryStat]:g.secondary,[a.NodeGraphDataFrameFieldNames.color]:h/r});const f=null===(i=d.references)||void 0===i||null===(l=i.find((e=>"CHILD_OF"===e.refType)))||void 0===l?void 0:l.spanID;f&&o[f].span&&n.push({[a.NodeGraphDataFrameFieldNames.id]:f+"--"+d.spanID,[a.NodeGraphDataFrameFieldNames.target]:d.spanID,[a.NodeGraphDataFrameFieldNames.source]:f})}return{nodes:t,edges:n}}(e),[r,o]=(0,m.np)();for(const e of t)r.add(e);for(const e of n)o.add(e);return[r,o]}var g=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js"),f=n.n(g);function b(e){if(!e)return"";const t=f().parse(e);return Object.keys(t).forEach((e=>{const n=t[e];"string"!=typeof n&&(t[e]=String(n))})),JSON.stringify(t)}function v(e){if(!e)return"";try{return f().stringify(JSON.parse(e))}catch{return e}}var y=n("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),j=n("./packages/grafana-ui/src/index.ts"),x=n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),D=n("./.yarn/__virtual__/react-transition-group-virtual-08a7713bd0/3/opt/drone/yarncache/react-transition-group-npm-4.4.1-5b62a122ef-0bcd8af483.zip/node_modules/react-transition-group/esm/CSSTransition.js"),T=n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const F="e.g. 1.2s, 100ms, 500us";function _({query:e,onChange:t}){const[n,a]=(0,x.useState)(!1),r=(0,j.useStyles)(S);return(0,T.jsxs)("div",{children:[(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)("div",{className:r.advancedOptionsContainer,onClick:()=>a(!n),children:(0,T.jsxs)(j.InlineLabel,{as:"div",children:["Advanced options"," ",(0,T.jsx)(j.Icon,{className:n?r.angleUp:r.angleDown,name:"angle-down"})]})})}),(0,T.jsx)(D.Z,{in:n,mountOnEnter:!0,unmountOnExit:!0,timeout:300,classNames:r,children:(0,T.jsxs)("div",{children:[(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Min Duration",labelWidth:21,grow:!0,children:(0,T.jsx)(j.Input,{value:e.minDuration||"",placeholder:F,onChange:n=>t(Object.assign({},e,{minDuration:n.currentTarget.value}))})})}),(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Max Duration",labelWidth:21,grow:!0,children:(0,T.jsx)(j.Input,{value:e.maxDuration||"",placeholder:F,onChange:n=>t(Object.assign({},e,{maxDuration:n.currentTarget.value}))})})}),(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Limit",labelWidth:21,grow:!0,tooltip:"Maximum numbers of returned results",children:(0,T.jsx)(j.Input,{value:e.limit||"",type:"number",onChange:n=>t(Object.assign({},e,{limit:n.currentTarget.value?parseInt(n.currentTarget.value,10):void 0}))})})})]})})]})}function S(e){return{advancedOptionsContainer:y.css`
      margin: 0 ${e.spacing.xs} ${e.spacing.xs} 0;
      width: 100%;
      cursor: pointer;
    `,enter:y.css`
      label: enter;
      height: 0;
      opacity: 0;
    `,enterActive:y.css`
      label: enterActive;
      height: 108px;
      opacity: 1;
      transition: height 300ms ease, opacity 300ms ease;
    `,exit:y.css`
      label: exit;
      height: 108px;
      opacity: 1;
    `,exitActive:y.css`
      label: exitActive;
      height: 0;
      opacity: 0;
      transition: height 300ms ease, opacity 300ms ease;
    `,angleUp:y.css`
      transform: rotate(-180deg);
      transition: transform 300ms;
    `,angleDown:y.css`
      transform: rotate(0deg);
      transition: transform 300ms;
    `}}const w={label:"All",value:void 0};function C({datasource:e,query:t,onChange:n}){const[a,r]=(0,x.useState)(),[o,s]=(0,x.useState)();return(0,x.useEffect)((()=>{(async()=>{const t=await N({dataSource:e,url:"/api/services",notFoundLabel:"No service found"});r(t)})()}),[e]),(0,x.useEffect)((()=>{t.service&&(async()=>{const n=await N({dataSource:e,url:`/api/services/${encodeURIComponent(t.service)}/operations`,notFoundLabel:"No operation found"});s([w,...n])})()}),[e,t.service]),(0,T.jsxs)("div",{className:(0,y.css)({maxWidth:"500px"}),children:[(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Service",labelWidth:14,grow:!0,children:(0,T.jsx)(j.Select,{menuShouldPortal:!0,options:a,value:(null==a?void 0:a.find((e=>e.value===t.service)))||null,onChange:e=>{n(Object.assign({},t,{service:e.value,operation:t.service!==e.value?void 0:t.operation}))},menuPlacement:"bottom",isClearable:!0})})}),(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Operation",labelWidth:14,grow:!0,disabled:!t.service,children:(0,T.jsx)(j.Select,{menuShouldPortal:!0,options:o,value:(null==o?void 0:o.find((e=>e.value===t.operation)))||null,onChange:e=>n(Object.assign({},t,{operation:e.value})),menuPlacement:"bottom",isClearable:!0})})}),(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Tags",labelWidth:14,grow:!0,children:(0,T.jsx)(j.Input,{value:v(t.tags),placeholder:"http.status_code=200 error=true",onChange:e=>n(Object.assign({},t,{tags:e.currentTarget.value}))})})}),(0,T.jsx)(_,{query:t,onChange:n})]})}const N=async({dataSource:e,url:t,notFoundLabel:n})=>{const a=await e.metadataRequest(t);if(!a)return[{label:n,value:n}];return a.sort().map((e=>({label:e,value:e})))};function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class O extends a.DataSourceApi{constructor(e,t=(0,p.$t)()){super(e),I(this,"uploadedJson",null),I(this,"nodeGraph",void 0),this.instanceSettings=e,this.timeSrv=t,this.instanceSettings=e,this.timeSrv=t,this.nodeGraph=e.jsonData.nodeGraph}async metadataRequest(e,t){return(await(0,o.n)(this._request(e,t,{hideFromInspector:!0}))).data.data}query(e){const t=e.targets[0];if(!t)return(0,s.of)({data:[E]});if("search"!==t.queryType&&t.query)return this._request(`/api/traces/${encodeURIComponent(t.query)}`).pipe((0,i.U)((e=>{var t,n,a;const r=null==e||null===(t=e.data)||void 0===t||null===(n=t.data)||void 0===n?void 0:n[0];if(!r)return{data:[E]};let o=[(0,u.xM)(r)];return null!==(a=this.nodeGraph)&&void 0!==a&&a.enabled&&o.push(...h(r)),{data:o}})));if("upload"===t.queryType){if(!this.uploadedJson)return(0,s.of)({data:[]});try{var n;const e=JSON.parse(this.uploadedJson).data[0];let t=[(0,u.xM)(e)];return null!==(n=this.nodeGraph)&&void 0!==n&&n.enabled&&t.push(...h(e)),(0,s.of)({data:t})}catch(e){return(0,s.of)({error:{message:"JSON is not valid Jaeger format"},data:[]})}}let a=(0,r.pick)(t,["operation","service","tags","minDuration","maxDuration","limit"]);return a=(0,r.pickBy)(a,r.identity),a.tags&&(a=Object.assign({},a,{tags:b((0,d.getTemplateSrv)().replace(a.tags,e.scopedVars))})),"All"===a.operation&&(a=(0,r.omit)(a,"operation")),this._request("/api/traces",Object.assign({},a,this.getTimeRange(),{lookback:"custom"})).pipe((0,i.U)((e=>({data:[(0,u.Wp)(e.data.data,this.instanceSettings)]}))))}async testDatasource(){return(0,o.n)(this._request("/api/services").pipe((0,i.U)((e=>{var t;return((null==e||null===(t=e.data)||void 0===t?void 0:t.data)||[]).length>0?{status:"success",message:"Data source connected and services found."}:{status:"error",message:"Data source connected, but no services received. Verify that Jaeger is configured properly."}})),(0,l.K)((e=>{let t="Jaeger: ";return e.statusText?t+=e.statusText:t+="Cannot connect to Jaeger",e.status&&(t+=`. ${e.status}`),e.data&&e.data.message?t+=`. ${e.data.message}`:e.data&&(t+=`. ${JSON.stringify(e.data)}`),(0,s.of)({status:"error",message:t})}))))}getTimeRange(){const e=this.timeSrv.timeRange();return{start:z(e.from,!1),end:z(e.to,!0)}}getQueryDisplayText(e){return e.query||""}_request(e,t,n){const a=t?(0,c.tW)(t):"",r=`${this.instanceSettings.url}${e}${a.length?`?${a}`:""}`,o=Object.assign({},n,{url:r});return(0,d.getBackendSrv)().fetch(o)}}function z(e,t){return"string"==typeof e&&(e=a.dateMath.parse(e,t)),1e3*e.valueOf()}const E=new a.MutableDataFrame({fields:[{name:"trace",type:a.FieldType.trace,values:[]}],meta:{preferredVisualisationType:"trace",custom:{traceFormat:"jaeger"}}});var q=n("./public/app/core/components/NodeGraphSettings.tsx"),L=n("./public/app/core/components/TraceToLogsSettings.tsx");const k=new a.DataSourcePlugin(O).setConfigEditor((({options:e,onOptionsChange:t})=>(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(j.DataSourceHttpSettings,{defaultUrl:"http://localhost:16686",dataSourceConfig:e,showAccessOptions:!1,onChange:t}),(0,T.jsx)("div",{className:"gf-form-group",children:(0,T.jsx)(L.Z,{options:e,onOptionsChange:t})}),(0,T.jsx)("div",{className:"gf-form-group",children:(0,T.jsx)(q.n,{options:e,onOptionsChange:t})})]}))).setQueryEditor((function({datasource:e,query:t,onChange:n,onRunQuery:a}){var r;const o=(0,j.useTheme2)(),s=e=>{const a=Object.assign({},t,{query:e});n(a)};return(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)("div",{className:(0,y.css)({width:"100%"}),children:[(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Query type",children:(0,T.jsx)(j.RadioButtonGroup,{options:[{value:"search",label:"Search"},{value:void 0,label:"TraceID"},{value:"upload",label:"JSON file"}],value:t.queryType,onChange:e=>n(Object.assign({},t,{queryType:e})),size:"md"})})}),(()=>{switch(t.queryType){case"search":return r||(r=(0,T.jsx)(C,{datasource:e,query:t,onChange:n}));case"upload":return(0,T.jsx)("div",{className:(0,y.css)({padding:o.spacing(2)}),children:(0,T.jsx)(j.FileDropzone,{options:{multiple:!1},onLoad:t=>{e.uploadedJson=t,a()}})});default:return(0,T.jsx)(j.InlineFieldRow,{children:(0,T.jsx)(j.InlineField,{label:"Trace ID",labelWidth:14,grow:!0,children:(0,T.jsx)(j.QueryField,{query:t.query,onChange:s,onRunQuery:a,onBlur:()=>{},placeholder:"Enter a Trace ID (run with Shift+Enter)",portalOrigin:"jaeger"})})})}})()]})})}))},"./.yarn/__virtual__/react-transition-group-virtual-08a7713bd0/3/opt/drone/yarncache/react-transition-group-npm-4.4.1-5b62a122ef-0bcd8af483.zip/node_modules/react-transition-group/esm/CSSTransition.js":(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var a=n("../../opt/drone/yarncache/@babel-runtime-npm-7.15.4-52ce5bf6ea-c408254304.zip/node_modules/@babel/runtime/helpers/esm/extends.js"),r=n("../../opt/drone/yarncache/@babel-runtime-npm-7.15.4-52ce5bf6ea-c408254304.zip/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),o=n("../../opt/drone/yarncache/@babel-runtime-npm-7.15.4-52ce5bf6ea-c408254304.zip/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),s=(n("../../opt/drone/yarncache/prop-types-npm-15.7.2-d7a04f2274-5eef82fdda.zip/node_modules/prop-types/index.js"),n("../../opt/drone/yarncache/dom-helpers-npm-5.2.1-b38bb4470b-863ba9e086.zip/node_modules/dom-helpers/esm/addClass.js")),i=n("../../opt/drone/yarncache/dom-helpers-npm-5.2.1-b38bb4470b-863ba9e086.zip/node_modules/dom-helpers/esm/removeClass.js"),l=n("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),d=n("./.yarn/__virtual__/react-transition-group-virtual-08a7713bd0/3/opt/drone/yarncache/react-transition-group-npm-4.4.1-5b62a122ef-0bcd8af483.zip/node_modules/react-transition-group/esm/Transition.js"),c=function(e,t){return e&&t&&t.split(" ").forEach((function(t){return(0,i.Z)(e,t)}))},p=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).appliedClasses={appear:{},enter:{},exit:{}},t.onEnter=function(e,n){var a=t.resolveArguments(e,n),r=a[0],o=a[1];t.removeClasses(r,"exit"),t.addClass(r,o?"appear":"enter","base"),t.props.onEnter&&t.props.onEnter(e,n)},t.onEntering=function(e,n){var a=t.resolveArguments(e,n),r=a[0],o=a[1]?"appear":"enter";t.addClass(r,o,"active"),t.props.onEntering&&t.props.onEntering(e,n)},t.onEntered=function(e,n){var a=t.resolveArguments(e,n),r=a[0],o=a[1]?"appear":"enter";t.removeClasses(r,o),t.addClass(r,o,"done"),t.props.onEntered&&t.props.onEntered(e,n)},t.onExit=function(e){var n=t.resolveArguments(e)[0];t.removeClasses(n,"appear"),t.removeClasses(n,"enter"),t.addClass(n,"exit","base"),t.props.onExit&&t.props.onExit(e)},t.onExiting=function(e){var n=t.resolveArguments(e)[0];t.addClass(n,"exit","active"),t.props.onExiting&&t.props.onExiting(e)},t.onExited=function(e){var n=t.resolveArguments(e)[0];t.removeClasses(n,"exit"),t.addClass(n,"exit","done"),t.props.onExited&&t.props.onExited(e)},t.resolveArguments=function(e,n){return t.props.nodeRef?[t.props.nodeRef.current,e]:[e,n]},t.getClassNames=function(e){var n=t.props.classNames,a="string"==typeof n,r=a?""+(a&&n?n+"-":"")+e:n[e];return{baseClassName:r,activeClassName:a?r+"-active":n[e+"Active"],doneClassName:a?r+"-done":n[e+"Done"]}},t}(0,o.Z)(t,e);var n=t.prototype;return n.addClass=function(e,t,n){var a=this.getClassNames(t)[n+"ClassName"],r=this.getClassNames("enter").doneClassName;"appear"===t&&"done"===n&&r&&(a+=" "+r),"active"===n&&e&&e.scrollTop,a&&(this.appliedClasses[t][n]=a,function(e,t){e&&t&&t.split(" ").forEach((function(t){return(0,s.Z)(e,t)}))}(e,a))},n.removeClasses=function(e,t){var n=this.appliedClasses[t],a=n.base,r=n.active,o=n.done;this.appliedClasses[t]={},a&&c(e,a),r&&c(e,r),o&&c(e,o)},n.render=function(){var e=this.props,t=(e.classNames,(0,r.Z)(e,["classNames"]));return l.createElement(d.ZP,(0,a.Z)({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},t}(l.Component);p.defaultProps={classNames:""},p.propTypes={};const u=p},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser.js":(e,t)=>{e.exports=function(e){return null==e&&(e={}),function(t,n,a){return t._body?a():t.header("content-type")===e.contentType?(t._body=!0,t.body=t.body||{},r="",t.setEncoding("utf8"),t.on("data",(function(e){return r+=e})),void t.on("end",(function(){try{var n=[];r.trim().split("\n").forEach((function(t){n.push(e.parser(t))})),t.body=n}catch(e){return e.body=r,e.status=400,a(e)}return a()}))):a();var r}}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser_stream.js":(e,t,n)=>{n("../../opt/drone/yarncache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js"),n("../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),n("?4917").Readable;var a=n("?4917").PassThrough,r=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js");e.exports=function(e){null==e&&(e={});var t=e.contentType||"application/logplex-1";return function(e,n,o){return e._body?o():e.header("content-type")===t?(e._body=!0,e.body=new a({objectMode:!0}),e.pipe(r.streamParser()).pipe(e.body),o()):o()}}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logfmt_parser.js":(e,t)=>{t.debug=!1,t.parse=function(e){var n="",a="",r=!1,o=!1,s=!1,i=!1,l={},d=t.debug;"\n"==e[e.length-1]&&(e=e.slice(0,e.length-1));for(var c=0;c<=e.length;c++){if(" "==e[c]&&!s||c==e.length){if(r&&n.length>0?l[n]=!0:o&&("true"==a?a=!0:"false"==a?a=!1:""!==a||i||(a=null),l[n]=a,a=""),c==e.length)break;r=!1,o=!1,s=!1,i=!1}"="!=e[c]||s?"\\"==e[c]?(a+=e[++c],d&&console.log("escape: "+e[c])):'"'==e[c]?(i=!0,s=!s,d&&console.log("in quote: "+s)):" "==e[c]||o||r?r?(d&&console.log("add to key: "+e[c]),n+=e[c]):o&&(d&&console.log("add to value: "+e[c]),a+=e[c]):(d&&console.log("start key with: "+e[c]),r=!0,n=e[c]):(d&&console.log("split"),r=!1,o=!0)}return l}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logger.js":(e,t,n)=>{t.log=function(e,t){this.stream=this.stream||process.stdout,null==t&&(t=this.stream);var n=Object.assign({},this.defaultData,e);if(this.timers)for(var a in this.timers){var r=(new Date).getTime();n[a]=(r-this.timers[a]).toString()+"ms"}t.write(this.stringify(n)+"\n")},t.time=function(e){var t=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js"),a=(new Date).getTime(),r=(e=e||"elapsed",new t);return r.stream=this.stream,r.defaultData=this.defaultData,r.timers=Object.assign({},this.timers),r.timers[e]=a,r},t.namespace=function(e){var t=new(n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js")),a=Object.assign({},this.defaultData,e);return t.stream=this.stream,t.defaultData=a,t.timers=this.timers,t},t.error=function(e,t){this.maxErrorLines=this.maxErrorLines||10,void 0===t&&(t=Math.random().toString().slice(2,12));var n=this.namespace({error:!0,id:t,now:(new Date).toISOString()});if(n.log({message:e.message}),e.stack){var a=e.stack.split("\n");for(var r in a){if(r>=this.maxErrorLines)break;n.log({line:r,trace:a[r]})}}}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/request_logger.js":(e,t)=>{var n=function(e,t){if("function"==typeof e.path)var n=e.path();else n=e.originalUrl||e.path||e.url;var a=e.header&&e.header("x-forwarded-for"),r=e.header&&e.header("x-request-id"),o={ip:e.ip||a||e.connection.remoteAddress,time:(new Date).toISOString(),method:e.method,path:n,status:t.statusCode};return r&&(o.request_id=r),t.get&&(o.content_length=t.get("content-length"),o.content_type=t.get("content-type")),o};t.init=function(e,t,a){return this.logger=e,a||t?a||("function"==typeof t?(a=t,t={}):a=n):(a=n,t={}),(t=t||{}).immediate?function(e,t,n){return function(t,a,r){var o=n(t,a);e.log(o),r()}}(e,0,a):function(e,t,n){return function(a,r,o){var s=t.elapsed||"elapsed",i=e.time(s),l=r.end;r.end=function(e,t){var o=n(a,r);r.end=l,r.end(e,t),i.log(o)},o()}}(e,t,a)},t.commonFormatter=n},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/streaming.js":(e,t,n)=>{var a=n("../../opt/drone/yarncache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js"),r=n("../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),o=n("?4917").PassThrough;t.streamParser=function(e){var t=new o,n=this,s=r((function(e){""!==e&&this.queue(n.parse(e))}));return t.on("pipe",(function(e){e.unpipe&&e.unpipe(this),this.transformStream=e.pipe(a()).pipe(s)})),t.pipe=function(e,t){return this.transformStream.pipe(e,t)},t},t.streamStringify=function(e){var t=this;if((e=e||{}).hasOwnProperty("delimiter"))var n=e.delimiter;else n="\n";return r((function(e){this.queue(t.stringify(e)+n)}),(function(){this.queue(null)}))}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/stringify.js":(e,t)=>{t.stringify=function(e){var t="";for(var n in e){var a=e[n],r=!1;null==a?(r=!0,a=""):a=a.toString();var o=a.indexOf(" ")>-1||a.indexOf("=")>-1;(a.indexOf('"')>-1||a.indexOf("\\")>-1)&&(a=a.replace(/["\\]/g,"\\$&")),o&&(a='"'+a+'"'),""!==a||r||(a='""'),t+=n+"="+a+" "}return t.substring(0,t.length-1)}},"../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/logfmt.js":(e,t,n)=>{function a(){}e.exports=a;var r=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/streaming.js"),o=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser.js"),s=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/body_parser_stream.js"),i=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logfmt_parser.js"),l=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/logger.js"),d=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/request_logger.js"),c=n("../../opt/drone/yarncache/logfmt-npm-1.3.2-37fabee436-639d327c1e.zip/node_modules/logfmt/lib/stringify.js");Object.assign(a.prototype,l),Object.assign(a.prototype,r),a.prototype.stringify=c.stringify,a.prototype.parse=i.parse,a.prototype.bodyParser=function(e){e||(e={});var t=e.contentType||"application/logplex-1";return o({contentType:t,parser:this.parse})},a.prototype.bodyParserStream=function(e){e||(e={});var t=e.contentType||"application/logplex-1";return s({contentType:t})},a.prototype.requestLogger=function(e,t){return d.init(this,e,t)},a.prototype.requestLogger.commonFormatter=d.commonFormatter,Object.assign(a,a.prototype)},"../../opt/drone/yarncache/split-npm-0.2.10-a950dc8c82-9eb1195608.zip/node_modules/split/index.js":(e,t,n)=>{var a=n("../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js"),r=n("?03f3").StringDecoder;e.exports=function(e,t){var n=new r,o="";"function"==typeof e&&(t=e,e=null);e||(e=/\r?\n/);function s(e,n){if(t){try{n=t(n)}catch(t){return e.emit("error",t)}void 0!==n&&e.queue(n)}else e.queue(n)}function i(t,n){var a=(o+n).split(e);o=a.pop();for(var r=0;r<a.length;r++){s(t,a[r])}}return a((function(e){i(this,n.write(e))}),(function(){n.end&&i(this,n.end()),null!=o&&s(this,o),this.queue(null)}))}},"../../opt/drone/yarncache/through-npm-2.3.8-df5f72a16e-a38c3e0598.zip/node_modules/through/index.js":(e,t,n)=>{var a=n("?0e0d");function r(e,t,n){e=e||function(e){this.queue(e)},t=t||function(){this.queue(null)};var r=!1,o=!1,s=[],i=!1,l=new a;function d(){for(;s.length&&!l.paused;){var e=s.shift();if(null===e)return l.emit("end");l.emit("data",e)}}function c(){l.writable=!1,t.call(l),!l.readable&&l.autoDestroy&&l.destroy()}return l.readable=l.writable=!0,l.paused=!1,l.autoDestroy=!(n&&!1===n.autoDestroy),l.write=function(t){return e.call(this,t),!l.paused},l.queue=l.push=function(e){return i||(null===e&&(i=!0),s.push(e),d()),l},l.on("end",(function(){l.readable=!1,!l.writable&&l.autoDestroy&&process.nextTick((function(){l.destroy()}))})),l.end=function(e){if(!r)return r=!0,arguments.length&&l.write(e),c(),l},l.destroy=function(){if(!o)return o=!0,r=!0,s.length=0,l.writable=l.readable=!1,l.emit("close"),l},l.pause=function(){if(!l.paused)return l.paused=!0,l},l.resume=function(){return l.paused&&(l.paused=!1,l.emit("resume")),d(),l.paused||l.emit("drain"),l},l}e.exports=r,r.through=r}}]);
//# sourceMappingURL=1557.1f65f885c5a67f13d9d6.js.map