/// <reference types="react" />
/// <reference types="node" />

declare module "*.svg" {
    import * as React from "react";
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module "*.png" {
    const src: string;
    export default src;
  }
  declare module "*.jpg" {
    const src: string;
    export default src;
  }
  declare module "*.jpeg" {
    const src: string;
    export default src;
  }
  declare module "*.gif" {
    const src: string;
    export default src;
  }
  declare module "*.webp" {
    const src: string;
    export default src;
  }
  declare module "*.avif" {
    const src: string;
    export default src;
  }
  declare module "*.mp4" {
    const src: string;
    export default src;
  }
  declare module "*.webm" {
    const src: string;
    export default src;
  }
  declare module "*.mp3" {
    const src: string;
    export default src;
  }
  declare module "*.wav" {
    const src: string;
    export default src;
  }
  declare module "*.css" {
    const content: string;
    export default content;
  }
  
  declare global {
    type ValueOf<T> = T[keyof T];
    type Prettify<T> = { [K in keyof T]: T[K] } & {};
    type Nullable<T> = T | null;
    type Maybe<T> = T | null | undefined;
    type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
    type WithRequired<T, K extends keyof T> = T & { [P in K]-?: NonNullable<T[P]> };
    type Brand<T, B extends string> = T & { __brand: B };
  
    type IconComponent = React.ComponentType<{ className?: string }>;
  
    interface Window {
      doNotTrack?: string;
      gtag?: (...args: any[]) => void;
      plausible?: (event: string, opts?: { props?: Record<string, unknown>; u?: string }) => void;
      umami?: any;
      posthog?: {
        capture: (name: string, props?: Record<string, unknown>) => void;
        identify?: (id: string, props?: Record<string, unknown>) => void;
        setPersonProperties?: (props: Record<string, unknown>) => void;
        reset?: () => void;
      };
    }
  
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_SITE_URL?: string;
        NEXT_PUBLIC_ANALYTICS_PROVIDER?: "plausible" | "gtag" | "umami" | "posthog" | "console" | "none";
        NEXT_PUBLIC_ANALYTICS_DEBUG?: "true" | "false";
        MAIL_PROVIDER?: "resend" | "sendgrid" | "smtp" | "console" | "none";
        MAIL_FROM?: string;
        MAIL_TO_DEFAULT?: string;
        RESEND_API_KEY?: string;
        SENDGRID_API_KEY?: string;
        SMTP_HOST?: string;
        SMTP_PORT?: string;
        SMTP_USER?: string;
        SMTP_PASS?: string;
      }
    }
  }
  
  export {};
  