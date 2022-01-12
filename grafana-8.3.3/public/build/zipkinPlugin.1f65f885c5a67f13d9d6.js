"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[4023],{"./public/app/core/components/NodeGraphSettings.tsx":(e,a,t)=>{t.d(a,{n:()=>d});t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js");var n,s=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=t("./packages/grafana-data/src/index.ts"),i=t("./packages/grafana-ui/src/index.ts"),r=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");function d({options:e,onOptionsChange:a}){var t;const s=(0,i.useStyles)(l);return(0,r.jsxs)("div",{className:s.container,children:[n||(n=(0,r.jsx)("h3",{className:"page-heading",children:"Node Graph"})),(0,r.jsx)(i.InlineFieldRow,{className:s.row,children:(0,r.jsx)(i.InlineField,{tooltip:"Enables the Node Graph visualization in the trace viewer.",label:"Enable Node Graph",labelWidth:26,children:(0,r.jsx)(i.InlineSwitch,{value:null===(t=e.jsonData.nodeGraph)||void 0===t?void 0:t.enabled,onChange:t=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"nodeGraph",Object.assign({},e.jsonData.nodeGraph,{enabled:t.currentTarget.checked}))})})})]})}const l=e=>({container:s.css`
    label: container;
    width: 100%;
  `,row:s.css`
    label: row;
    align-items: baseline;
  `})},"./public/app/core/components/TraceToLogsSettings.tsx":(e,a,t)=>{t.d(a,{Z:()=>l});var n,s=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),o=t("./packages/grafana-data/src/index.ts"),i=t("./packages/grafana-runtime/src/index.ts"),r=t("./packages/grafana-ui/src/index.ts"),d=(t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js"));function l({options:e,onOptionsChange:a}){var t,l,p,u,m,h,g;const v=(0,r.useStyles)(c);return(0,d.jsxs)("div",{className:(0,s.css)({width:"100%"}),children:[n||(n=(0,d.jsx)("h3",{className:"page-heading",children:"Trace to logs"})),(0,d.jsx)("div",{className:v.infoText,children:"Trace to logs let's you navigate from a trace span to the selected data source's log."}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{tooltip:"The data source the trace is going to navigate to",label:"Data source",labelWidth:26,children:(0,d.jsx)(i.DataSourcePicker,{pluginId:"loki",current:null===(t=e.jsonData.tracesToLogs)||void 0===t?void 0:t.datasourceUid,noDefault:!0,width:40,onChange:t=>{var n;return(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",{datasourceUid:t.uid,tags:null===(n=e.jsonData.tracesToLogs)||void 0===n?void 0:n.tags})}})})}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{tooltip:"Tags that will be used in the Loki query. Default tags: 'cluster', 'hostname', 'namespace', 'pod'",label:"Tags",labelWidth:26,children:(0,d.jsx)(r.TagsInput,{tags:null===(l=e.jsonData.tracesToLogs)||void 0===l?void 0:l.tags,width:40,onChange:t=>{var n;return(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",{datasourceUid:null===(n=e.jsonData.tracesToLogs)||void 0===n?void 0:n.datasourceUid,tags:t})}})})}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{label:"Span start time shift",labelWidth:26,grow:!0,tooltip:"Shifts the start time of the span. Default 0 (Time units can be used here, for example: 5s, 1m, 3h)",children:(0,d.jsx)(r.Input,{type:"text",placeholder:"1h",width:40,onChange:t=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{spanStartTimeShift:t.currentTarget.value})),value:(null===(p=e.jsonData.tracesToLogs)||void 0===p?void 0:p.spanStartTimeShift)||""})})}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{label:"Span end time shift",labelWidth:26,grow:!0,tooltip:"Shifts the end time of the span. Default 0 Time units can be used here, for example: 5s, 1m, 3h",children:(0,d.jsx)(r.Input,{type:"text",placeholder:"1h",width:40,onChange:t=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{spanEndTimeShift:t.currentTarget.value})),value:(null===(u=e.jsonData.tracesToLogs)||void 0===u?void 0:u.spanEndTimeShift)||""})})}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{label:"Filter by Trace ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Trace ID. Appends '|=<trace id>' to the query.",children:(0,d.jsx)(r.InlineSwitch,{value:null===(m=e.jsonData.tracesToLogs)||void 0===m?void 0:m.filterByTraceID,onChange:t=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{filterByTraceID:t.currentTarget.checked}))})})}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{label:"Filter by Span ID",labelWidth:26,grow:!0,tooltip:"Filters logs by Span ID. Appends '|=<span id>' to the query.",children:(0,d.jsx)(r.InlineSwitch,{value:null===(h=e.jsonData.tracesToLogs)||void 0===h?void 0:h.filterBySpanID,onChange:t=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{filterBySpanID:t.currentTarget.checked}))})})}),(0,d.jsx)(r.InlineFieldRow,{children:(0,d.jsx)(r.InlineField,{label:"Loki Search",labelWidth:26,grow:!0,tooltip:"Use this logs data source to search for traces.",children:(0,d.jsx)(r.InlineSwitch,{defaultChecked:!0,value:null===(g=e.jsonData.tracesToLogs)||void 0===g?void 0:g.lokiSearch,onChange:t=>(0,o.updateDatasourcePluginJsonDataOption)({onOptionsChange:a,options:e},"tracesToLogs",Object.assign({},e.jsonData.tracesToLogs,{lokiSearch:t.currentTarget.checked}))})})})]})}const c=e=>({infoText:s.css`
    padding-bottom: ${e.spacing.md};
    color: ${e.colors.textSemiWeak};
  `})},"./public/app/core/utils/tracing.ts":(e,a,t)=>{t.d(a,{et:()=>s,nO:()=>o,fy:()=>i,np:()=>d});var n=t("./packages/grafana-data/src/index.ts");function s(e){e.sort(((e,a)=>e[0]-a[0]));return e.reduce(((e,a)=>{if(!e.length)return[a];const t=e.slice(-1)[0],[n,s]=t,[o,i]=a;return i<s?e:o>s?[...e,a]:[...e.slice(0,-1),[n,i]]}),[]).reduce(((e,a)=>e+(a[1]-a[0])),0)}function o(e){const a={};let t;for(let n=0;t=e(n),t;n++){a[t.id]?a[t.id].span=t.span:a[t.id]={span:t.span,children:[]};for(const e of t.parentIds)e&&(a[e]?a[e].children.push(t.id):a[e]={span:void 0,children:[t.id]})}return a}function i(e,a,t){return{main:`${r(e)}ms (${r(e/a*100)}%)`,secondary:`${r(t)}ms (${r(t/e*100)}%)`}}function r(e){return parseFloat(e.toFixed(2))}function d(){return[new n.MutableDataFrame({fields:[{name:n.NodeGraphDataFrameFieldNames.id,type:n.FieldType.string},{name:n.NodeGraphDataFrameFieldNames.title,type:n.FieldType.string},{name:n.NodeGraphDataFrameFieldNames.subTitle,type:n.FieldType.string},{name:n.NodeGraphDataFrameFieldNames.mainStat,type:n.FieldType.string,config:{displayName:"Total time (% of trace)"}},{name:n.NodeGraphDataFrameFieldNames.secondaryStat,type:n.FieldType.string,config:{displayName:"Self time (% of total)"}},{name:n.NodeGraphDataFrameFieldNames.color,type:n.FieldType.number,config:{color:{mode:"continuous-GrYlRd"},displayName:"Self time / Trace duration"}}],meta:{preferredVisualisationType:"nodeGraph"}}),new n.MutableDataFrame({fields:[{name:n.NodeGraphDataFrameFieldNames.id,type:n.FieldType.string},{name:n.NodeGraphDataFrameFieldNames.target,type:n.FieldType.string},{name:n.NodeGraphDataFrameFieldNames.source,type:n.FieldType.string}],meta:{preferredVisualisationType:"nodeGraph"}})]}},"./public/app/plugins/datasource/zipkin/module.ts":(e,a,t)=>{t.r(a),t.d(a,{plugin:()=>S});var n=t("./packages/grafana-data/src/index.ts"),s=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js"),o=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"),i=t("../../opt/drone/yarncache/rxjs-npm-7.3.0-8a14d1c3d9-e63adb8808.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js"),r=t("./packages/grafana-runtime/src/index.ts"),d=t("./public/app/core/utils/fetch.ts");var l=t("./public/app/core/utils/tracing.ts");function c(e){const{nodes:a,edges:t}=function(e){const a=[],t=[],s=function(e){let a=0,t=1/0;for(const n of e)n.timestamp<t&&(t=n.timestamp),n.timestamp+n.duration>a&&(a=n.timestamp+n.duration);return a-t}(e),o=(0,l.nO)((a=>{if(!(a>=e.length))return{span:e[a],id:e[a].id,parentIds:e[a].parentId?[e[a].parentId]:[]}}));for(const d of e){var i,r;const e=o[d.id].children.map((e=>{const a=o[e].span;return[a.timestamp,a.timestamp+a.duration]})),c=(0,l.et)(e),p=d.duration-c,u=(0,l.fy)(d.duration/1e3,s/1e3,p/1e3);a.push({[n.NodeGraphDataFrameFieldNames.id]:d.id,[n.NodeGraphDataFrameFieldNames.title]:(null===(i=d.localEndpoint)||void 0===i?void 0:i.serviceName)||(null===(r=d.remoteEndpoint)||void 0===r?void 0:r.serviceName)||"unknown",[n.NodeGraphDataFrameFieldNames.subTitle]:d.name,[n.NodeGraphDataFrameFieldNames.mainStat]:u.main,[n.NodeGraphDataFrameFieldNames.secondaryStat]:u.secondary,[n.NodeGraphDataFrameFieldNames.color]:p/s}),d.parentId&&o[d.parentId].span&&t.push({[n.NodeGraphDataFrameFieldNames.id]:d.parentId+"--"+d.id,[n.NodeGraphDataFrameFieldNames.target]:d.id,[n.NodeGraphDataFrameFieldNames.source]:d.parentId})}return{nodes:a,edges:t}}(e),[s,o]=(0,l.np)();for(const e of a)s.add(e);for(const e of t)o.add(e);return[s,o]}var p=t("./public/app/plugins/datasource/zipkin/utils/transforms.ts");function u(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}class m extends n.DataSourceApi{constructor(e){super(e),u(this,"uploadedJson",null),u(this,"nodeGraph",void 0),this.instanceSettings=e,this.instanceSettings=e,this.nodeGraph=e.jsonData.nodeGraph}query(e){const a=e.targets[0];if("upload"===a.queryType){if(!this.uploadedJson)return(0,s.of)({data:[]});try{var t;const e=JSON.parse(this.uploadedJson);return(0,s.of)(h({data:e},null===(t=this.nodeGraph)||void 0===t?void 0:t.enabled))}catch(e){return(0,s.of)({error:{message:"JSON is not valid Zipkin format"},data:[]})}}return a.query?this.request(`/api/v2/trace/${encodeURIComponent(a.query)}`).pipe((0,i.U)((e=>{var a;return h(e,null===(a=this.nodeGraph)||void 0===a?void 0:a.enabled)}))):(0,s.of)(g)}async metadataRequest(e,a){return(await(0,o.n)(this.request(e,a,{hideFromInspector:!0}))).data}async testDatasource(){return await this.metadataRequest("/api/v2/services"),{status:"success",message:"Data source is working"}}getQueryDisplayText(e){return e.query}request(e,a,t){const n=a?(0,d.tW)(a):"",s=`${this.instanceSettings.url}${e}${n.length?`?${n}`:""}`,o=Object.assign({},t,{url:s});return(0,r.getBackendSrv)().fetch(o)}}function h(e,a=!1){let t=null!=e&&e.data?[(0,p.m)(null==e?void 0:e.data)]:[];return a&&t.push(...c(null==e?void 0:e.data)),{data:t}}const g={data:[new n.MutableDataFrame({fields:[{name:"trace",type:n.FieldType.trace,values:[]}],meta:{preferredVisualisationType:"trace",custom:{traceFormat:"zipkin"}}})]};var v=t("./.yarn/__virtual__/@emotion-css-virtual-9fd25d72e0/3/opt/drone/yarncache/@emotion-css-npm-11.1.3-72aa05c30f-dc50283f65.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),f=t("./packages/grafana-ui/src/index.ts"),y=t("./public/app/core/actions/index.ts"),j=t("./public/app/core/copy/appNotification.ts"),b=t("./public/app/store/store.ts"),T=t("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),F=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/index.js"),D=t("./.yarn/__virtual__/react-use-virtual-ca2705900f/3/opt/drone/yarncache/react-use-npm-17.2.4-c702db5427-3c885c3798.zip/node_modules/react-use/esm/useAsyncFn.js"),x=t("./.yarn/__virtual__/react-use-virtual-ca2705900f/3/opt/drone/yarncache/react-use-npm-17.2.4-c702db5427-3c885c3798.zip/node_modules/react-use/esm/useMount.js"),N=t("./.yarn/__virtual__/react-use-virtual-ca2705900f/3/opt/drone/yarncache/react-use-npm-17.2.4-c702db5427-3c885c3798.zip/node_modules/react-use/esm/useMountedState.js"),k=t("../../opt/drone/yarncache/react-npm-17.0.1-98658812fc-83b9df9529.zip/node_modules/react/jsx-runtime.js");const I=[{label:"No traces found",value:"no_traces",isLeaf:!0}],_={"[No traces in time range]":"__NO_TRACES__"};var O=t("./public/app/core/components/NodeGraphSettings.tsx"),w=t("./public/app/core/components/TraceToLogsSettings.tsx");const S=new n.DataSourcePlugin(m).setQueryEditor((({query:e,onChange:a,onRunQuery:t,datasource:n})=>{const s=function(e){const a="/api/v2/services",[t,n]=(0,D.Z)((async()=>{try{const t=await e.metadataRequest(a);return t?t.sort().map((e=>({label:e,value:e,isLeaf:!1}))):[]}catch(e){throw(0,b.WI)((0,y.$l)((0,j.t_)("Failed to load services from Zipkin",e))),e}}),[e]);return(0,x.Z)((()=>{n()})),t}(n),o=(0,f.useTheme2)(),{onLoadOptions:i,allOptions:r}=function(e){const a=(0,N.Z)(),[t,n]=(0,F.useState)({}),[,s]=(0,D.Z)((async function(t){const s="/api/v2/spans";try{const o=await e.metadataRequest(s,{serviceName:t});a()&&n((e=>{const a=(0,T.fromPairs)(o.map((e=>[e,void 0])));return Object.assign({},e,{[t]:a})}))}catch(e){throw(0,b.WI)((0,y.$l)((0,j.t_)("Failed to load spans from Zipkin",e))),e}}),[e,t]),[,o]=(0,D.Z)((async function(t,s){const o="/api/v2/traces",i={serviceName:t,spanName:s};try{const r=await e.metadataRequest(o,i);if(a()){const e=r.length?(0,T.fromPairs)(r.map((e=>{const a=e.find((e=>!e.parentId));return[`${a.name} [${Math.floor(a.duration/1e3)} ms]`,a.traceId]}))):_;n((a=>{const n=a[t];return Object.assign({},a,{[t]:Object.assign({},n,{[s]:e})})}))}}catch(e){throw(0,b.WI)((0,y.$l)((0,j.t_)("Failed to load spans from Zipkin",e))),e}}),[e]);return{onLoadOptions:(0,F.useCallback)((e=>{const a=e[0].value;if(1===e.length)s(a);else if(2===e.length){const t=e[1].value;o(a,t)}}),[s,o]),allOptions:t}}(n),d=(0,F.useCallback)(((n,s)=>{if(3===s.length){const n=s[2].value;a(Object.assign({},e,{query:n})),t()}}),[a,t,e]);let l=function(e,a){return(0,F.useMemo)((()=>{let t=[];return e.value&&e.value.length?t=e.value.map((e=>Object.assign({},e,{children:a[e.value]&&Object.keys(a[e.value]).map((t=>({label:t,value:t,isLeaf:!1,children:a[e.value][t]&&Object.keys(a[e.value][t]).map((n=>({label:n,value:a[e.value][t][n]})))})))}))):e.value&&!e.value.length&&(t=I),t}),[e,a])}(s,r);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(f.InlineFieldRow,{children:(0,k.jsx)(f.InlineField,{label:"Query type",children:(0,k.jsx)(f.RadioButtonGroup,{options:[{value:"traceID",label:"TraceID"},{value:"upload",label:"JSON file"}],value:e.queryType||"traceID",onChange:t=>a(Object.assign({},e,{queryType:t})),size:"md"})})}),"upload"===e.queryType?(0,k.jsx)("div",{className:(0,v.css)({padding:o.spacing(2)}),children:(0,k.jsx)(f.FileDropzone,{options:{multiple:!1},onLoad:e=>{n.uploadedJson=e,t()}})}):(0,k.jsxs)(f.InlineFieldRow,{children:[(0,k.jsx)(f.ButtonCascader,{options:l,onChange:d,loadData:i,children:"Traces"}),(0,k.jsx)("div",{className:"gf-form gf-form--grow flex-shrink-1 min-width-15",children:(0,k.jsx)(f.QueryField,{query:e.query,onChange:t=>{const n=Object.assign({},e,{query:t});a(n)},onRunQuery:t,placeholder:"Insert Trace ID (run with Shift+Enter)",portalOrigin:"zipkin"})})]})]})})).setConfigEditor((({options:e,onOptionsChange:a})=>(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(f.DataSourceHttpSettings,{defaultUrl:"http://localhost:9411",dataSourceConfig:e,showAccessOptions:!1,onChange:a}),(0,k.jsx)("div",{className:"gf-form-group",children:(0,k.jsx)(w.Z,{options:e,onOptionsChange:a})}),(0,k.jsx)("div",{className:"gf-form-group",children:(0,k.jsx)(O.n,{options:e,onOptionsChange:a})})]})))},"./public/app/plugins/datasource/zipkin/utils/transforms.ts":(e,a,t)=>{t.d(a,{m:()=>o,H:()=>c});var n=t("../../opt/drone/yarncache/lodash-npm-4.17.21-6382451519-eb835a2e51.zip/node_modules/lodash/lodash.js"),s=t("./packages/grafana-data/src/index.ts");function o(e){const a=e.map(i),t=new s.MutableDataFrame({fields:[{name:"traceID",type:s.FieldType.string},{name:"spanID",type:s.FieldType.string},{name:"parentSpanID",type:s.FieldType.string},{name:"operationName",type:s.FieldType.string},{name:"serviceName",type:s.FieldType.string},{name:"serviceTags",type:s.FieldType.other},{name:"startTime",type:s.FieldType.number},{name:"duration",type:s.FieldType.number},{name:"logs",type:s.FieldType.other},{name:"tags",type:s.FieldType.other}],meta:{preferredVisualisationType:"trace",custom:{traceFormat:"zipkin"}}});for(const e of a)t.add(e);return t}function i(e){var a,t,n,s;const o={traceID:e.traceId,spanID:e.id,parentSpanID:e.parentId,operationName:e.name,serviceName:(null===(a=e.localEndpoint)||void 0===a?void 0:a.serviceName)||(null===(t=e.remoteEndpoint)||void 0===t?void 0:t.serviceName)||"unknown",serviceTags:d(e),startTime:e.timestamp/1e3,duration:e.duration/1e3,logs:null!==(n=null===(s=e.annotations)||void 0===s?void 0:s.map(r))&&void 0!==n?n:[],tags:Object.keys(e.tags||{}).reduce(((a,t)=>"error"===t?(a.push({key:"error",value:!0}),a.push({key:"errorValue",value:e.tags.error}),a):(a.push({key:t,value:e.tags[t]}),a)),[])};var i,l;e.kind&&(o.tags=[{key:"kind",value:e.kind},...null!==(i=o.tags)&&void 0!==i?i:[]]);e.shared&&(o.tags=[{key:"shared",value:e.shared},...null!==(l=o.tags)&&void 0!==l?l:[]]);return o}function r(e){return{timestamp:e.timestamp,fields:[{key:"annotation",value:e.value}]}}function d(e){const a=e.localEndpoint||e.remoteEndpoint;return a?[l("ipv4",a.ipv4),l("ipv6",a.ipv6),l("port",a.port),l("endpointType",e.localEndpoint?"local":"remote")].filter(n.identity):[]}function l(e,a){if(a)return{key:e,value:a}}const c=e=>{let a=[];for(let s=0;s<e.length;s++){var t,n;const o=e.get(s);a.push(Object.assign({traceId:o.traceID,parentId:o.parentSpanID,name:o.operationName,id:o.spanID,timestamp:1e3*o.startTime,duration:1e3*o.duration},p(o),{annotations:o.logs.length?o.logs.map((e=>({timestamp:e.timestamp,value:e.fields[0].value}))):void 0,tags:o.tags.length?o.tags.filter((e=>"kind"!==e.key&&"endpointType"!==e.key&&"shared"!==e.key)).reduce(((e,a)=>"error"===a.key?Object.assign({},e,{[a.key]:o.tags.find((e=>"errorValue"===e.key)).value||""}):Object.assign({},e,{[a.key]:a.value})),{}):void 0,kind:null===(t=o.tags.find((e=>"kind"===e.key)))||void 0===t?void 0:t.value,shared:null===(n=o.tags.find((e=>"shared"===e.key)))||void 0===n?void 0:n.value}))}return a},p=e=>{var a,t,n,s;const o="local"===(null===(a=e.serviceTags.find((e=>"endpointType"===e.key)))||void 0===a?void 0:a.value)?"localEndpoint":"remoteEndpoint";return"unknown"!==e.serviceName?{[o]:{serviceName:e.serviceName,ipv4:null===(t=e.serviceTags.find((e=>"ipv4"===e.key)))||void 0===t?void 0:t.value,ipv6:null===(n=e.serviceTags.find((e=>"ipv6"===e.key)))||void 0===n?void 0:n.value,port:null===(s=e.serviceTags.find((e=>"port"===e.key)))||void 0===s?void 0:s.value}}:void 0}},"./.yarn/__virtual__/react-use-virtual-ca2705900f/3/opt/drone/yarncache/react-use-npm-17.2.4-c702db5427-3c885c3798.zip/node_modules/react-use/esm/useMount.js":(e,a,t)=>{t.d(a,{Z:()=>s});var n=t("./.yarn/__virtual__/react-use-virtual-ca2705900f/3/opt/drone/yarncache/react-use-npm-17.2.4-c702db5427-3c885c3798.zip/node_modules/react-use/esm/useEffectOnce.js");const s=function(e){(0,n.Z)((function(){e()}))}}}]);
//# sourceMappingURL=zipkinPlugin.1f65f885c5a67f13d9d6.js.map