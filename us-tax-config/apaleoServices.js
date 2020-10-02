const e = React.createElement;
var myStyles;

const createStyles = function(){
  myStyles = useStyles();
}

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bearer: null,
      error: null,
      isLoaded: false,
      items: []
    };
  }

  async getBearer() {
    if (!this.state.bearer){
    await fetch("https://cc46sd0feb.execute-api.us-east-1.amazonaws.com/dev/apaleo")
      .then(res => res.json())
      .then(
        (result) => {
          this.state.bearer = result.message;
          this.setState({
            bearer: result.message,
            isLoaded: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    return this.state.bearer;
  }
}

var auth = new Auth();
auth.getBearer().then(r => {

console.log('Returning ' + auth.state.bearer);

});

class TaxForm extends React.Component {
  constructor(props) {
    super(props);
    this.account = props.account;
    this.state = {taxes: {city: false, state: false}};
  }

  render() {
    let element = e(
      FormControl, {component: 'fieldset'},
      [e(FormLabel, {component: 'legend'}, this.account.name),
      e(
        FormGroup, {},
        Object.keys(this.state.taxes).map(
          t => e(FormControlLabel,
                                   {control: e(Checkbox,{
                                     checked: this.state.taxes[t],
                                     name: t
                                   } ), label: t}, t))
      )]);
    return element;
  }
}

const TaxComp = MaterialUI.withStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}))(props => e(TaxForm, {color: 'default', ...props}));



class SubAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    auth.getBearer()
      .then(b => fetch("https://api.apaleo.com/settings/v0-nsfw/sub-accounts?propertyId=test&pageNumber=1&pageSize=100", {
    headers: {
      'Content-Type': 'application/json',
'Authorization': 'Bearer ' + b
    }}))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.subAccounts
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return e('div', {}, `Error: ${error.message}`);
    } else if (!isLoaded) {
      return e('div', {}, `Loading...`);
    } else {
      return e(
        'div', {}, items.map(item => e(TaxComp, {account: item})));
    }
  }
}
