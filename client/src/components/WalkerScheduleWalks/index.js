import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import API from "../../utils/API";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Moment from "moment";
import "../../index.css" 

class WalkerScheduleWalks extends Component {
  state = {
    date: new Date(),
    onwnerList: [],
    selectedOptions: []
  }

  componentDidMount() {
    this.loadOwners();
  }

  loadOwners = () => {
    const idWalker = this.props.walkerID;
    API.getDogOwners(idWalker)
      .then(res => {
        const dataDogOwners = res.data.map(data => {
          const dataOwners = {
            label: `${data.user.firstName} ${data.user.lastName} - ${data.dogName}`,
            value: data.id
          }
          return (dataOwners)
        })
        this.setState({ onwnerList: dataDogOwners })
      })
      .catch(err => console.log(err));
  }

  handleChangeList = (options) => {
    this.setState({ selectedOptions: options });
  }

  onChange = date => this.setState({ date })

  handleSchedule = () => {
    const idWalker = this.props.walkerID;
    console.log(this.state.selectedOptions)
    const selectedOwners = this.state.selectedOptions.map(data => {
      const idOwner = data.value;
      console.log('date', this.state.date)
      const dataOwners = {
        walkerId: idWalker,
        dogOwnerId: idOwner,
        status: 'pending',
        finish: 0,
        walkDate: Moment(this.state.date).format("YYYY-MM-DD HH:mm")
      }
      return (dataOwners)
    })

    API.addSchedule(selectedOwners, idWalker)
      .then(res => {
        //this.props.history.push("/userProfile/this.props.username#fullschedule")
        console.log("username",this.props.username)
        this.props.handlePageChange("FullSchedule")
      })
    }

  render() {
    return (
      <div className="rdtPicker">
      <p className="rdtPicker__title">Schedule a Walk</p>
        {/* <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br> */}
        
        <DateTimePicker 
          onChange={this.onChange}
          value={this.state.date}
          className="rdtPicker__picker"
          disableClock={true}
          calendarClassName='class1'
        />
       
        {/* <br></br> */}
        <div className="rdtPicker__select">
        <ReactMultiSelectCheckboxes 
          options={this.state.onwnerList}
          onChange={this.handleChangeList} />
          </div>
        {/* <br></br> */}
        <button className="rdtPicker__button" onClick={this.handleSchedule}>schedule</button>
      </div>
    );
  }
}

export default WalkerScheduleWalks;