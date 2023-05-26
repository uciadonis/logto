const webhooks = {
  page_title: 'Webhooks',
  title: 'Webhooks',
  subtitle:
    'Los Webhooks proporcionan actualizaciones en tiempo real sobre eventos específicos a la URL de su punto final, permitiendo reacciones inmediatas.',
  create: 'Crear Webhook',
  events: {
    post_register: 'Crear nueva cuenta',
    post_sign_in: 'Iniciar sesión',
    post_reset_password: 'Restablecer contraseña',
  },
  table: {
    name: 'Nombre',
    events: 'Eventos',
    success_rate: 'Tasa de éxito (24 h)',
    requests: 'Solicitudes (24 h)',
  },
  placeholder: {
    title: 'Webhook',
    description:
      'Los Webhooks proporcionan actualizaciones en tiempo real sobre eventos específicos a la URL de su punto final, permitiendo reacciones inmediatas. Los eventos de "Crear cuenta, Iniciar sesión, Restablecer contraseña" ahora son compatibles.',
    create_webhook: 'Crear Webhook',
  },
  create_form: {
    title: 'Crear Webhook',
    subtitle:
      'Agregue el Webhook para enviar una solicitud POST a la URL de punto final con detalles de cualquier evento de usuario.',
    events: 'Eventos',
    events_description:
      'Seleccione los eventos desencadenantes que Logto enviará la solicitud POST.',
    name: 'Nombre',
    name_placeholder: 'Ingrese el nombre del webhook',
    endpoint_url: 'URL de punto final',
    endpoint_url_placeholder: 'https://su.webhook.endpoint.url',
    endpoint_url_tip:
      'Ingrese la URL HTTPS de su punto final donde se envía el payload de un webhook cuando se produce un evento.',
    create_webhook: 'Crear webhook',
    missing_event_error: 'Debe seleccionar al menos un evento.',
    https_format_error: 'Se requiere formato HTTPS por motivos de seguridad.',
  },
  webhook_created: 'El webhook {{name}} se ha creado correctamente.',
};

export default webhooks;
