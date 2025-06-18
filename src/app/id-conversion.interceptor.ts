/**
 * HTTP interceptor that transforms backend MongoDB-style `_id` fields to frontend-friendly `id` fields.
 *
 * This interceptor is particularly useful when working with APIs (like MongoDB) that return documents with an `_id` field.
 * Angular and most frontend apps prefer using `id` as a common identifier key, so this interceptor helps keep consistency
 * across your frontend codebase by converting `_id` to `id`.
 *
 * @example
 * Input:
 *   { _id: 'abc123', name: 'Product A' }
 * Output:
 *   { id: 'abc123', name: 'Product A' }
 *
 * Arrays and single objects are both supported.
 *
 * @returns The cloned HTTP response with updated `body` content if applicable.
 *
 * @author
 *   Your Name - Sigma Wadbude
 */

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

/**
 * Angular functional interceptor that converts MongoDB-style `_id` fields to `id`.
 *
 * This ensures that the frontend consistently uses the `id` property,
 * while still supporting APIs that return `_id` from the backend.
 */
export const idConversionInterceptor: HttpInterceptorFn = (req, next) => {
  // Pass the HTTP request to the next handler (could be another interceptor or the backend).
  return next(req).pipe(
    map((event) => {
      // Only proceed if the response is a successful HttpResponse with a body.
      if (event instanceof HttpResponse && event.body) {
        /**
         * Converts an individual object by replacing `_id` with `id`, if `_id` exists and `id` doesn't.
         *
         * @param item An object that might contain a MongoDB `_id` property.
         * @returns A new object with `id` replacing `_id`, or the original object if no conversion is needed.
         */
        const convert = (item: any) => {
          if (item && item._id && !item.id) {
            const { _id, ...rest } = item;
            return {
              ...rest,
              id: _id,
            };
          }
          return item;
        };

        // Apply the convert function to either a single object or an array of objects.
        const modifiedBody = Array.isArray(event.body)
          ? event.body.map(convert)
          : convert(event.body);

        // Clone the response with the modified body (immutability preserved).
        return event.clone({ body: modifiedBody });
      }

      // If no changes are needed, return the original event.
      return event;
    })
  );
};
