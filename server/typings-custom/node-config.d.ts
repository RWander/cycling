// Type definitions for node-config
// Project: https://github.com/lorenwest/node-config
// Definitions by: Roman Korneev <https://github.com/RWander>
// Definitions: <not exist in https://github.com/borisyankov/DefinitelyTyped>

// see https://github.com/lorenwest/node-config/issues/247

declare module "config" {
	export function get(setting: string): any;
	export function has(setting: string): boolean;
}
