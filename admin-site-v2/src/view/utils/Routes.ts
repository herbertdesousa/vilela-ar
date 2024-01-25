import * as RRTS from 'react-router-typesafe-routes/dom';

export const ROUTES = {
  DOCUMENTS: RRTS.route(
    'documents',
    {},
    {
      SAVE_ROOMS: RRTS.route(
        'rooms',
        { params: { document_id: RRTS.string().defined() } },
        {
          DETAILS: RRTS.route(
            ':room_id',
            { params: { room_id: RRTS.string().defined() } },
            {
              DEVICE: RRTS.route(':device_id', {
                params: { device_id: RRTS.string().defined() },
              }),
            },
          ),
        },
      ),
    },
  ),
};
