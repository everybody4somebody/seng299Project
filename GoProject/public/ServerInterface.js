"use strict";
/**
 * Created by sdiemert on 2016-05-25.
 */

class ServerInterface{

    constructor(url, port){
        this._url = url || "roberts.seng.uvic.ca"; 
        this._port = port || 30010; 
    }

    /**
     * @param obj {object} the data to send.
     * @param path {string} the server path to make the request to.
     * @param callback {function} called when the server responds.
     *      Takes 1 parameter, an error parameter which is null if everything is OK.
     */
    _sendData(obj, path, callback){

        console.log("sending POST to "+path +" payload: "+JSON.stringify(obj));
        
        var postXhr = new XMLHttpRequest();
        postXhr.open("POST", path, true);
        postXhr.setRequestHeader("Content-type", "application/json");
        console.log(obj);
        postXhr.send(JSON.stringify(obj));
        console.log("jep");
        postXhr.onreadystatechange = function(){

            // this function is executed when the request comes 
            // back from the server. 

            if (postXhr.readyState == 4 && postXhr.status == 200) {
                console.log("or here?");
                callback(null);
            }else if(postXhr.readyState == 4 && postXhr.status !== 200){
                console.log("here");
                callback(postXhr.status);
            }
        }
    }

    /**
     * Makes a request to add a new task to the server.
     * 
     * @param name {string} the name of the task
     * @param project {string} the name of the project
     * @param start {Date} when the timer was started.
     * @param stop {Date} when the timer was stopped
     * @param cb {function} to call when request comes back. 
     */
    addUser(Username, Userpassword, cb){
        console.log("Rhere?")
        this._sendData(
            {Username : Username, Userpassword : Userpassword, 'wins': 0, 'losses':0, 'ELO':0},
            "/add",
            function(err){
                if(err){
                    console.log("Error adding user: "+err);
                    cb(err);
                }else{
                    cb(null);
                }
            }
        );
        
    }
    
    getUser (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/login", true);
        //xhr.open("GET", "/DBdata", true);
        xhr.send();

        xhr.onreadystatechange = function () {

            // this function is executed when the request comes
            // back from the server.

            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(null, JSON.parse(xhr.responseText));
            }else if(xhr.readyState == 4 && xhr.status !== 200){
                callback(xhr.status, null);
            }
        };
    
    }

    
    
    /**
     * Makes a request to remove a task from the server's memory.  
     * 
     * @param index {number} the index of the task to remove.
     * @param cb {function} to call when the request comes back. 
     */
    removeUser  (id, cb){
        this._sendData(
            {id : id},
            "/remove",
            function(err){
                if(err){
                    console.log("Error adding task: "+err);
                    cb(err);
                }else{
                    cb(null);
                }
            }
        )
        
    }

    /**
     * Requests time tracker data from the server using a HTTP GET request.
     *
     * @param callback {function} the function to call when the get request comes back.
     *      takes 2 parameters:
     *          1) an error paramenter, will be null if everything was OK.
     *          2) an object that represents the response from the server.
     */
     getData(callback) {
        console.log("sending GET to /DBdata");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/data", true);
        //xhr.open("GET", "/DBdata", true);
        xhr.send();

        xhr.onreadystatechange = function () {

            // this function is executed when the request comes
            // back from the server.

            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(null, JSON.parse(xhr.responseText));
            }else if(xhr.readyState == 4 && xhr.status !== 200){
                callback(xhr.status, null);
            }
        };
    }
    DBgetData(callback) {
        console.log("sending GET to /DBdata");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/DBdata", true);
        xhr.send();

        xhr.onreadystatechange = function () {

            // this function is executed when the request comes
            // back from the server.

            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(null, JSON.parse(xhr.responseText));
            }else if(xhr.readyState == 4 && xhr.status !== 200){
                callback(xhr.status, null);
            }
        };
    }

}
