declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
  export default ReactComponent;
}

declare module '*.jpg' {
  const path: string;
  export default path
}