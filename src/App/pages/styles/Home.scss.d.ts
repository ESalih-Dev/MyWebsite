declare namespace HomeScssNamespace {
  export interface IHomeScss {
    appear: string;
    blink: string;
    enterNameBox: string;
    fadein: string;
    fadeout: string;
    fall: string;
    glowGreen: string;
    glowRed: string;
    notReadyYetBanner: string;
    rise: string;
    type: string;
    typeAndUntype: string;
    typewriter: string;
    typewriterType: string;
    typewriterTypeAndUntype: string;
    typewriterUntype: string;
    untype: string;
  }
}

declare const HomeScssModule: HomeScssNamespace.IHomeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomeScssNamespace.IHomeScss;
};

export = HomeScssModule;
