// export const corsOptions = {
//   origin: function (origin, callback) {
//     return callback(null, true);
//   },
//   optionSuccessStatus: 200,
//   credentials: true,
// };

import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: function (
    _origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  // cors sẽ cho phép nhận cookie từ request
  credentials: true,
};
