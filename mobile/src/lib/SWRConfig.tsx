import React from 'react';

import { SWRConfig } from 'swr';
import { fetch } from '@/services/fetch';

interface ISWRConfigComponentProps {
  children: React.ReactElement;
}

export function SWRConfigComponent({
  children,
}: ISWRConfigComponentProps): React.ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: async err => {
          // await api.post(resources.admin_error_log.post, {
          //   request: {
          //     status: err.response.status,
          //     baseURL: err.response.config.baseURL,
          //     url: err.response.config.url,
          //     data: err.response.data,
          //     method: err.response.config.method,
          //     headers: err.response.config.headers,
          //   },
          //   time: new Date(Date.now()),
          //   user: {
          //     id: 0,
          //     name: '',
          //   },
          // });
          //
          // if (err.response.status === 401) return;
          //
          // disparar requisição para alguma rota de admin
          // if (err.response.status === 404) {
          //   addToast({
          //     title: 'Não encontrado',
          //     description: 'contate a administração para resolução do problema',
          //     type: 'warning',
          //   });
          //   return;
          // }
          // addToast({
          //   title: 'Erro interno no servidor',
          //   description: 'ocorreu um erro no servidor, tente novamente',
          // });
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
