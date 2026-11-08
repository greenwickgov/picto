import {Component,type ReactNode} from 'react';
export class ServiceBoundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true}}
 render(){if(!this.state.failed)return this.props.children;return <div className="app service-page"><section className="glass service-card"><img className="service-logo" src={import.meta.env.BASE_URL+'picto-wordmark.png'} alt="Picto"/><span className="eyebrow">OPEN BETA</span><h1>We’re getting connected.</h1><p>The account service is temporarily unavailable. No demo accounts or local signup are used. Please try again shortly.</p><button className="primary" onClick={()=>location.reload()}>Try again</button><a href="https://github.com/greenwickgov/picto">View the open-source project ↗</a></section></div>}
}
