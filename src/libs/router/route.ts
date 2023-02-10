import type { RootRouteOptions } from './ts/route';

export class Route {
  isRoot: boolean;

  constructor(options?: RootRouteOptions) {}

  init = () => {};
}

export class RootRoute extends Route {
  constructor(options?: RootRouteOptions) {
    super(options);
  }
}
