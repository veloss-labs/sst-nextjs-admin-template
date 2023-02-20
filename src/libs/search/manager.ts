import { isArray, isEmpty, isString } from '~/utils/assertion';
import { SearchState } from './searchState';

export class ManagerSearch<S = any> extends SearchState<S> {
  makeQuery(query: Partial<S>): S {
    const parser = (query: any) => {
      const checkbox = query.checkbox as string[];

      if (
        checkbox &&
        isArray(checkbox) &&
        checkbox.some((v) => ['true', 'false'].includes(v))
      ) {
        Object.assign(query, {
          checkbox,
        });
      }

      const select = query.select as string;
      if (select) {
        Object.assign(query, {
          select,
        });
      }

      const ignoreKeys = ['rangeTime'];

      for (const key in query) {
        if (ignoreKeys.includes(key)) {
          delete query[key];
        }
        // 값이 없으면 제거
        if (isEmpty(query[key])) {
          delete query[key];
        }
      }

      return query;
    };

    return this.baseMakeQuery(query, parser);
  }

  IsSearchQuery = (state: any) => {
    return this.checkIsSearchQuery(state);
  };

  getClientForm = (query: any, ignoreKeys: string[] = []) => {
    const parser = (q: any) => {
      const checkbox = q.checkbox as string[];

      if (
        checkbox &&
        isArray(checkbox) &&
        checkbox.some((v) => ['true', 'false'].includes(v))
      ) {
        Object.assign(q, {
          checkbox,
        });
      } else if (checkbox && isString(checkbox)) {
        const _checkbox = checkbox.split(',');
        if (_checkbox.some((v) => ['true', 'false'].includes(v))) {
          Object.assign(q, {
            checkbox: _checkbox,
          });
        }
      }

      const select = q.select as string;
      if (select) {
        Object.assign(q, {
          select,
        });
      }

      for (const key in q) {
        if (ignoreKeys.includes(key)) {
          delete q[key];
        }
      }

      return q;
    };

    return this.makeClientQuery(query, parser);
  };
}
