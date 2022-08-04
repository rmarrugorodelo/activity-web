export class NavigationRoute {
  static readonly EMPTY = '';
  static readonly DASHBOARD = 'dashboard';
  static readonly ADMINISTRATION = 'administration';
  static readonly LOGIN = 'login';
  static readonly RENEW_PASSWORD = 'renew-password';
  static readonly RECOVER_PASSWORD = 'recover-password';
  static readonly SELECT_MODULE = 'select-module';
  static readonly PROVIDER = 'business/registration/provider';
  static readonly REQUEST = 'business/registration/request';
  static readonly APPROVALS = 'business/registration/approvals';
  static readonly REQUEST_DETAIL = 'business/registration/request/:id/detail';
  static readonly SEND_REQUEST = 'business/registration/send-invitation';
  static readonly DELEGATE_APPROVAL = 'business/registration/delegate-approval';
  static readonly TRACEABILITY = 'business/registration/request/:id/traceabilities';
  static readonly PROVIDER_WITHOUT_CODE_SAP = 'business/registration/provider/mdm/list';
  static readonly NOTIFICATIONS = 'business/registration/my-notifications';
  static readonly USERS = 'administration/users';
  static readonly COUNTRIES = 'administration/countries';
  static readonly IDENTYFICATION_TYPES = 'administration/identification-types';
  static readonly VALUES_OBJECTS = 'administration/values-objects';
  static readonly PREQUALIFICATION = {
    PROVIDER: 'business/prequalification/provider',
    PROVIDER_WITHOUT_CODE_SAP: 'business/prequalification/provider/mdm/list',
    SEND_REQUEST: 'business/prequalification/send-invitation',
    REQUEST: 'business/prequalification/request',
    TRACEABILITY: 'business/prequalification/request/:id/traceabilities',
    REQUEST_DETAIL: 'business/prequalification/request/:id/detail',
    REQUEST_QUESTION: 'business/prequalification/request/:id/group/:groupId/questions'
  };
  static readonly FORM = 'administration/forms';
  static readonly FORM_CREATE = 'administration/forms/new';
  static readonly FORM_UPDATE = 'administration/forms/:id';
  static readonly QUESTIONS = 'administration/forms/:id/groups/:groupId/questions';
  static readonly QUESTION_CREATE = 'administration/forms/:id/groups/:groupId/questions/new';
  static readonly QUESTION_UPDATE = 'administration/forms/:id/groups/:groupId/questions/:questionId';
  static readonly VALUE_OBJECT_FORM = 'administration/values-objects-groups';
  static readonly FORMAT = 'administration/formats';
  static readonly REPORTS = 'business/reports';
}
