import React from "react";
import { connect } from "react-redux";
import { fetchComp } from "../../actions";

class Company extends React.Component {
  componentDidMount() {
    this.props.fetchComp(this.props.match.params.id);
  }

  renderEditbtn = () => {
    const userId = this.props.user._id;
    const ownerArr = this.props.company.owners;
    for(let i = 0; i < ownerArr.length; i++) {
      if (ownerArr[i] === userId) {
        return (<button className="circular ui icon button">
        <i className="edit outline icon"></i>
      </button>)
      }
    }
  }


  render() {
    console.log(this.props.company);
    if (!this.props.company) {
      return <div>Loading</div>;
    }
    const { company_email, company_name_en, website } = this.props.company;
    return (
      <div className="company-container">
        <div className="ui container">
          <div className="ui grid">
            <div className="two wide column"></div>
            <div className="four wide column" style={{ textAlign: "center" }}>
              <img
                className="company-img"
                src={process.env.PUBLIC_URL + "/logoDefault.png"}
              ></img>
            </div>
            <div className="six wide column">
              <div className="company-info">
                <div>
                  <h1 className="company-name">{company_name_en}</h1>
                  <div className="ui blue labels">
                    <a className="ui label">Happy</a>
                    <a className="ui label">Smart</a>
                    <a className="ui label">Insane</a>
                    <a className="ui label">Exciting</a>
                  </div>
                </div>
                
                <div className="btn-group">
                  <div
                    className="ui teal button"
                    onClick={() => window.open(`${website}`)}
                  >
                    Website
                  </div>
                  <a
                    className="ui yellow button"
                    href={`mailto:${company_email}`}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="four wide column">
            <div>
                {this.props.company && this.renderEditbtn()}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user,company }) => {
  return { user,company: company.currentCompany };
};

export default connect(mapStateToProps, { fetchComp })(Company);
