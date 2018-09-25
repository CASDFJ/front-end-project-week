import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { fetchNote } from "../../actions";
import "./index.css";

const mapStateToProps = state => {
  return {
    notesArray: state
  };
};

class NotesList extends Component {
  state = {};

  componentWillMount() {
    let reversed = Array.from(this.props.notesArray).reverse();
    this.setState({ notesArray: reversed });
  }

  generateNotes = (what, where) => {
    return (
      <Link to={`/note/${what._id}`} className="unstyled_link" key={what._id}>
        <div className="note">
          <div>
            <h4>{what.title}</h4>
            <div className="blackline"/>
            <p>{what.body}</p>
          </div>
        </div>
      </Link>
    );
  };

  render() {
    // console.log("Props NoteList", this.props);
    return (
      <div className="notesList_container">
        <div>
          <h3 className="content_header">Your Notes:</h3>
        </div>
        <div className="notesList">
          {this.state.notesArray.map(this.generateNotes)}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(NotesList);
