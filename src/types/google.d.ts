interface Window {
  google: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (response: { access_token?: string; error?: string }) => void;
          prompt?: 'none' | 'consent' | 'select_account';
          access_type?: 'offline' | 'online';
          hint?: string;
        }) => {
          requestAccessToken: () => void;
        };
      };
    };
  };
} 