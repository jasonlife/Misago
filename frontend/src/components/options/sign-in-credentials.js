import React from 'react';
import Button from 'misago/components/button'; // jshint ignore:line
import Form from 'misago/components/form';
import FormGroup from 'misago/components/form-group'; // jshint ignore:line
import misago from 'misago/index';
import ajax from 'misago/services/ajax';
import title from 'misago/services/page-title';
import snackbar from 'misago/services/snackbar';
import * as validators from 'misago/utils/validators';

export class ChangeEmail extends Form {
  constructor(props) {
    super(props);

    this.state = {
      new_email: '',
      password: '',

      validators: {
        new_email: [
          validators.email()
        ],
        password: []
      },

      isLoading: false
    };
  }

  clean() {
    let errors = this.validate();
    let lengths = [
      this.state.new_email.trim().length,
      this.state.password.trim().length
    ];

    if (lengths.indexOf(0) !== -1) {
      snackbar.error(gettext("Fill out all fields."));
      return false;
    }

    if (errors.new_email) {
      snackbar.error(errors.new_email[0]);
      return false;
    }

    return true;
  }

  send() {
    return ajax.post(this.props.user.api_url.change_email, {
      new_email: this.state.new_email,
      password: this.state.password,
    });
  }

  handleSuccess(response) {
    this.setState({
      new_email: '',
      password: ''
    });

    snackbar.success(response.detail);
  }

  handleError(rejection) {
    if (rejection.status === 400) {
      if (rejection.new_email) {
        snackbar.error(rejection.new_email);
      } else {
        snackbar.error(rejection.password);
      }
    } else {
      snackbar.apiError(rejection);
    }
  }

  render() {
    /* jshint ignore:start */
    return <form onSubmit={this.handleSubmit} className="form-horizontal">
      <input type="type" style={{display: 'none'}} />
      <input type="password" style={{display: 'none'}} />
      <div className="panel panel-default panel-form">
        <div className="panel-heading">
          <h3 className="panel-title">{gettext("Change e-mail address")}</h3>
        </div>
        <div className="panel-body">

          <FormGroup label={gettext("New e-mail")} for="id_new_email"
                     labelClass="col-sm-4" controlClass="col-sm-8">
            <input type="text" id="id_new_email" className="form-control"
                   disabled={this.state.isLoading}
                   onChange={this.bindInput('new_email')}
                   value={this.state.new_email} />
          </FormGroup>

          <hr />

          <FormGroup label={gettext("Your current password")} for="id_password"
                     labelClass="col-sm-4" controlClass="col-sm-8">
            <input type="password" id="id_password" className="form-control"
                   disabled={this.state.isLoading}
                   onChange={this.bindInput('password')}
                   value={this.state.password} />
          </FormGroup>

        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-4">

              <Button className="btn-primary" loading={this.state.isLoading}>
                {gettext("Change e-mail")}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </form>;
    /* jshint ignore:end */
  }
}

export class ChangePassword extends Form {
  constructor(props) {
    super(props);

    this.state = {
      new_password: '',
      repeat_password: '',
      password: '',

      validators: {
        new_password: [
          validators.passwordMinLength(misago.get('SETTINGS'))
        ],
        repeat_password: [],
        password: []
      },

      isLoading: false
    };
  }

  clean() {
    let errors = this.validate();
    let lengths = [
      this.state.new_password.trim().length,
      this.state.repeat_password.trim().length,
      this.state.password.trim().length
    ];

    if (lengths.indexOf(0) !== -1) {
      snackbar.error(gettext("Fill out all fields."));
      return false;
    }

    if (errors.new_password) {
      snackbar.error(errors.new_password[0]);
      return false;
    }

    if (this.state.new_password.trim() !== this.state.repeat_password.trim()) {
      snackbar.error(gettext("New passwords are different."));
      return false;
    }

    return true;
  }

  send() {
    return ajax.post(this.props.user.api_url.change_password, {
      new_password: this.state.new_password,
      password: this.state.password
    });
  }

  handleSuccess(response) {
    this.setState({
      new_password: '',
      repeat_password: '',
      password: ''
    });

    snackbar.success(response.detail);
  }

  handleError(rejection) {
    if (rejection.status === 400) {
      if (rejection.new_password) {
        snackbar.error(rejection.new_password);
      } else {
        snackbar.error(rejection.password);
      }
    } else {
      snackbar.apiError(rejection);
    }
  }

  render() {
    /* jshint ignore:start */
    return <form onSubmit={this.handleSubmit} className="form-horizontal">
      <input type="type" style={{display: 'none'}} />
      <input type="password" style={{display: 'none'}} />
      <div className="panel panel-default panel-form">
        <div className="panel-heading">
          <h3 className="panel-title">{gettext("Change password")}</h3>
        </div>
        <div className="panel-body">

          <FormGroup label={gettext("New password")} for="id_new_password"
                     labelClass="col-sm-4" controlClass="col-sm-8">
            <input type="password" id="id_new_password" className="form-control"
                   disabled={this.state.isLoading}
                   onChange={this.bindInput('new_password')}
                   value={this.state.new_password} />
          </FormGroup>

          <FormGroup label={gettext("Repeat password")} for="id_repeat_password"
                     labelClass="col-sm-4" controlClass="col-sm-8">
            <input type="password" id="id_repeat_password" className="form-control"
                   disabled={this.state.isLoading}
                   onChange={this.bindInput('repeat_password')}
                   value={this.state.repeat_password} />
          </FormGroup>

          <hr />

          <FormGroup label={gettext("Your current password")} for="id_password"
                     labelClass="col-sm-4" controlClass="col-sm-8">
            <input type="password" id="id_password" className="form-control"
                   disabled={this.state.isLoading}
                   onChange={this.bindInput('password')}
                   value={this.state.password} />
          </FormGroup>

        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-4">

              <Button className="btn-primary" loading={this.state.isLoading}>
                {gettext("Change password")}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </form>;
    /* jshint ignore:end */
  }
}

export default class extends React.Component {
  componentDidMount() {
    title.set({
      title: gettext("Change sign-in credentials"),
      parent: gettext("Change your options")
    });
  }

  render() {
    /* jshint ignore:start */
    return <div>
      <ChangeEmail user={this.props.user} />
      <ChangePassword user={this.props.user} />

      <p className="message-line">
        <span className="material-icon">
          warning
        </span>
        <a href={misago.get('FORGOTTEN_PASSWORD_URL')}>
          {gettext("Change forgotten password")}
        </a>
      </p>
    </div>
    /* jshint ignore:end */
  }
}