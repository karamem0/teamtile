//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

export function compare(a: string | null | undefined, b: string | null | undefined): number {
  if (a === b) {
    return 0;
  }
  if (a == null) {
    return 1;
  }
  if (b == null) {
    return -1;
  }
  return String.prototype.localeCompare.call(a, b);
}

export function search(value: string | null | undefined, match: string | null | undefined) {
  if (value == null) {
    return false;
  }
  if (match == null) {
    return false;
  }
  if (value.search(new RegExp(match.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'), 'i')) < 0) {
    return false;
  }
  return true;
}
