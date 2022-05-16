import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsApp from './components/NewsApp';
import {
    
    Routes,
    Route,
  } from "react-router-dom";
  import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {

    pageSize = 15;
    country='in'

        state = {
         progress: 0
        }
 setProgress = (progress)=> {
        this.setState({progress: progress})
    }

    render() {
        
        return (
            <>
            <Navbar/>
            <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
            {/* <NewsApp setProgress={this.setProgress}  category={'this.category'}this.category'} pageSize={this.pageSize} country={this.country} /> */}
             <Routes>  

                    <Route path="*" element={<NewsApp setProgress={this.setProgress}  key="general" category={'General'} pageSize={this.pageSize} country={this.country} />}/>
                    <Route path="/business" element={<NewsApp setProgress={this.setProgress} key="business"  category={'Business'} pageSize={this.pageSize} country={this.country} />} />
                    <Route path="/entertainment" element={<NewsApp setProgress={this.setProgress} key="entertainment"  category={'Entertainment'} pageSize={this.pageSize} country={this.country} />} />
                    <Route path="/health" element={<NewsApp setProgress={this.setProgress} key="health"  category={'Health'} pageSize={this.pageSize} country={this.country} />} />
                    <Route path="/science" element={<NewsApp setProgress={this.setProgress} key="science"  category={'Science'} pageSize={this.pageSize} country={this.country} />}/> 
                    <Route path="/sports" element={<NewsApp setProgress={this.setProgress} key="sports"  category={'Sports'} pageSize={this.pageSize} country={this.country} />}/> 
                    <Route path="/technology" element={<NewsApp setProgress={this.setProgress} key="technology"  category={'Technology'} pageSize={this.pageSize} country={this.country} />} />
            </Routes> 
        
            </>
        )
    }
}
