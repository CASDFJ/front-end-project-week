import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DeleteNote from "../DeleteNote/DeleteNote.js";
import { fetchNoteId } from "../../actions";
import "./index.css";

const mapStateToProps = state => {
  // console.log("STATE: ", state);
  return {
    notesArray: state
  };
};

class NoteView extends Component {
  state = {
    displayDelete: false,
    matched: []
  };

  componentWillMount = () => {
    let routeId = this.props.match.params.id;
    console.log("RouteId: ", routeId);
    let matched = this.props.notesArray.filter(item => { 
      console.log('item._id:', item._id, 'bollywoodean:', item._id == routeId);
      return item._id == routeId;
    });
    console.log("Matched: ", matched);
    this.setState({ matched });
  };

  showModal = () => {
    this.setState({ displayDelete: !this.state.displayDelete });
  };

  render() {
    console.log("MATCHED TITLE: ", this.state.matched)
    return (
      <div className="noteView_container">
        <div className="noteView_topContent">
          <h3 className="content_header">{this.state.matched[0].title}</h3>
          <div>
            <Link
              to={`/edit/${this.props.match.params.id}`}
              className="edit_delete unstyled_link"
            >
              edit
            </Link>
            <a className="edit_delete" onClick={this.showModal}>
              delete
            </a>
          </div>
        </div>
        <div className="notesList">
          <p className="">{this.state.matched[0].body}</p>
        </div>
        <DeleteNote
          toggle={this.state.displayDelete}
          showModal={this.showModal}
          toDelete={this.state.matched[0].id}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchNoteId }
)(NoteView);
