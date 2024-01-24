import * as RRTS from 'react-router-typesafe-routes/dom';

export const ROUTES = {
  DOCUMENTS: RRTS.route(
    'documents',
    {},
    {
      SAVE_ROOMS: RRTS.route(
        ':document_id/rooms',
        { params: { document_id: RRTS.string().defined() } },
        {
          DETAILS: RRTS.route(':document_id/rooms/:room_id', {
            params: {
              document_id: RRTS.string().defined(),
              room_id: RRTS.string().defined(),
            },
          }),
        },
      ),
    },
  ),
};
