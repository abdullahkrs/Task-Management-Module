// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
var usersData;
window.addEventListener("load", (event) => {
    fetch('/Index?handler=Users')
        .then(response => response.json())
        .then(_usersData => {
            // Now you can use the 'usersData' variable in your JavaScript code
            usersData = _usersData;
        });
});


$(document).ready(function () {
    if (isAdminUser) {
        $('#addNewTask').css('display', 'block');
        getAllTasks()
	} else {
        GetTasksByUser(currentUserId)
	}
    
});
// Write your Javascript code.
var KanbanEl;
function initKanban() {

    $('#myKanban').empty()

    var _boards = [
        {
            id: "_inprogress",
            title: "In Progress",
            class: "warning",
            item: [

            ]
        },
        {
            id: "_done",
            title: "Completed",
            class: "success",
            item: [

            ]
        }
    ];
	if (isAdminUser) {
        _boards = [
            {
                id: "_notassignd",
                title: "Not Assigned",
                class: "info,good",
                item: [

                ]
            },
            {
                id: "_inprogress",
                title: "In Progress",
                class: "warning",
                item: [

                ]
            },
            {
                id: "_done",
                title: "Completed",
                class: "success",
                item: [

                ]
            }
        ]
	}
    KanbanEl = new jKanban({
        element: "#myKanban",
        //gutter: (($('main').eq(0).width()) - (($('main').eq(0).width() / 5) * 3)) / 6+"px",
        //widthBoard: $('main').eq(0).width() / 5+"px",
        responsivePercentage: true,                                    // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
        dragItems: false,
        itemHandleOptions: {
            enabled: false,
        },
        boards: _boards
    });
}


//var toDoButton = document.getElementById("addToDo");
//toDoButton.addEventListener("click", function () {
//    KanbanTest.addElement("_todo", {
//        title: "Test Add"
//    });
//});

var addNewTaskBtn = document.getElementById("addNewTask");
addNewTaskBtn.addEventListener("click", function () {
    Swal.fire({
        title: "<strong>Add New Task</strong>",
        //icon: "info",
        html: htmlText('New','', '', 'onTaskStatusChange()')
            
        ,
        showCloseButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        confirmButtonText: "Save",
        didOpen: function () {
            //$('.form-group select').selectpicker({
            //    noneSelectedText: 'Please Select' // by this default 'Nothing selected' -->will change to Please Select
            //});
        }
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            addKanbanElement(NewTaskTitle.value, NewTaskDesc.value, NewTaskStatus.value, NewTaskUser.value)
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
    //KanbanTest.addElement("_todo", {
    //    title: "Test Add at Pos"
    //}, 1);
});

function onTaskStatusChange() {
    if ($('#NewTaskStatus').val() != '_notassignd') {
        $('#NewTaskUser').parent().parent().css('display', 'flex');
	} else {
        $('#NewTaskUser').parent().parent().css('display', 'none');

	}
}

function onEditTaskStatusChange() {
    if ($('#EditTaskStatus').val() != '_notassignd') {
        $('#EditTaskUser').parent().parent().css('display', 'flex');
    } else {
        $('#EditTaskUser').parent().parent().css('display', 'none');

    }
}

//function onAprovalTaskStatusChange() {
//    if ($('#EditTaskApproval').val() != 'Not Approved') {
//        $('#EditTaskUser').parent().parent().css('display', 'flex');
//    } else {
//        $('#EditTaskUser').parent().parent().css('display', 'none');

//    }
//}


function addKanbanElement(_TaskTitle, _TaskDesc, _TaskStatus, _TaskUser) {

    addTask(_TaskTitle, _TaskDesc, _TaskUser, _TaskStatus, currentUser)
    
}

function htmlText(_type, _title, _desc, _changStatusFunc, _status = '', _username = '', _id = '', _AdminRemarks = '') {
    var _display = ''
    var _approvalElement = ''
    var _remarkElement = ''
    var _idElement = ''
    var _readonly = ''
    var _readonlyuser = ''
    var _TaskStatusOptions = '  <option value="_notassignd">Not Assigned</option>'
        + '  <option value="_inprogress">In Progress</option>'
        + '  <option value="_done">Completed</option>'
    if (_type == 'New') {
        _display = 'display:none'
	} else {
        _idElement = '<div class="form-group row">'
            + '<label for="' + _type + 'TaskID" class="col-sm-4">ID</label>'
            + '<div class="col-sm-8">'
            + '<input readonly  type="text"  class="form-control" id="' + _type + 'TaskID" value="' + _id + '">'
            + '</div>'
            + '</div>'

        
	}

    if (_status == '_done' && isAdminUser) {
        _approvalElement =
            '<div class="form-group row">'
            + '<label for="' + _type + 'TaskApproval" class="col-sm-4">Status</label>'
            + '<div class="col-sm-8">'
        + '<select onchange="" class="form-control" name="' + _type + 'TaskApproval" id="' + _type + 'TaskApproval">'
        + '  <option value=""></option>'
        + '  <option value="Not Approved">Not Approved</option>'
        + '  <option value="Approved">Approved</option>'
            + '</select>'
            + '</div>'
            + '</div>'

        + '<div class="form-group row">'
        + '<label for="' + _type + 'AdminRemarks" class="col-sm-4">Admin Remarks</label>'
        + '<div class="col-sm-8">'
        + '<textarea rows="2"  class="form-control" id="' + _type + 'AdminRemarks" value=""></textarea>'
        + '</div>'
        + '</div>'

        _readonly = 'disabled';
    } else if (_status == '_inprogress' && _AdminRemarks != null) {
        _remarkElement =
            '<div class="form-group row">'
        + '<label for="' + _type + 'AdminRemarks" class="col-sm-4">Admin Remarks</label>'
            + '<div class="col-sm-8">'
        + '<textarea disabled rows="2"  class="form-control" id="' + _type + 'AdminRemarks" >' + _AdminRemarks +'</textarea>'
            + '</div>'
            + '</div>'

        
    }

    if (!isAdminUser) {
        _readonlyuser = 'disabled';
        _TaskStatusOptions = '  <option value="_inprogress">In Progress</option>'
            + '  <option value="_done">Completed</option>'
	}


    return '<form>'

        + '<div class="form-group d-flex justify-content-center"">'
        + '<div id="qrcode"></div>'
        + '</div>'

        + _idElement

        + '<div class="form-group row">'
        + '<label for="' + _type +'TaskTitle" class="col-sm-4">Title</label>'
        + '<div class="col-sm-8">'
        + '<input ' + _readonlyuser + ' ' + _readonly +' type="text"  class="form-control" id="' + _type +'TaskTitle" value="' + _title + '">'
        + '</div>'
        + '</div>'

        + '<div class="form-group row">'
        + '<label for="' + _type +'TaskDesc" class="col-sm-4">Description</label>'
        + '<div class="col-sm-8">'
        + '<input  ' + _readonlyuser + ' ' + _readonly +' type="text"  class="form-control" id="' + _type +'TaskDesc" value="' + _desc + '">'
        + '</div>'
        + '</div>'

        + '<div class="form-group row">'
        + '<label for="' + _type +'TaskStatus" class="col-sm-4">Status</label>'
        + '<div class="col-sm-8">'
        + '<select ' + _readonly +' onchange="' + _changStatusFunc + '" class="form-control" name="' + _type + 'TaskStatus" id="' + _type +'TaskStatus">'
        + _TaskStatusOptions
        + '</select>'
        + '</div>'
        + '</div>'


        + '<div style="' + _display+'" class="form-group row">'
        + '<label for="' + _type +'TaskUser" class="col-sm-4">User</label>'
        + '<div class="col-sm-8">'
        + '<select  ' + _readonlyuser + ' ' + _readonly +' class="form-control" name="' + _type +'TaskUser" id="' + _type +'TaskUser">'
        + usersData.map(user => `<option value="${user.id}">${user.email}</option>`).join('')
        + '</select>'
        + '</div>'
        + '</div>'

        + _approvalElement

        + _remarkElement

        + '</form>';
}


function addTask(_TaskTitle, _TaskDesc, _TaskUser, _TaskStatus, _CreatedBy) {
    var taskData = {
        TaskTitle: _TaskTitle,
        TaskDesc: _TaskDesc,
        TaskUser: _TaskUser,
        TaskStatus: _TaskStatus,
        CreatedBy: _CreatedBy,
        // Add other properties as needed
    };

    $.ajax({
        url: '/Tasks/AddTask',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(taskData),
        success: function (result) {
            if (result.success) {
                //KanbanTest.addElement(_TaskStatus, {
                //    title: _TaskTitle,
                //    desc: _TaskDesc,
                //    status: _TaskStatus,
                //    username: _TaskUser,
                //    click: function (el) {
                //        Swal.fire({
                //            title: "<strong>Edit Task</strong>",
                //            //icon: "info",
                //            html: htmlText('Edit', _TaskTitle, _TaskDesc, 'onEditTaskStatusChange()', _TaskStatus, _TaskUser)
                //            ,
                //            showCloseButton: true,
                //            showDenyButton: true,
                //            showCancelButton: true,
                //            confirmButtonText: "Save",
                //            denyButtonText: `Don't save`,
                //            confirmButtonText: "Save",
                //        })

                //        $("#EditTaskStatus").val(_TaskStatus).change();
                //        $("#EditTaskUser").val(_TaskUser).change();
                //    },
                //});

                //$("#EditTaskStatus").val(_TaskStatus).change();
                //$("#EditTaskUser").val(_TaskUser).change();
                if (isAdminUser) {
                    getAllTasks()
                } else {
                    GetTasksByUser(currentUserId)
                }
                Swal.fire('Success', 'Task added successfully', 'success');
            } else {
                // Task addition failed
                Swal.fire('Error', 'Failed to add task', 'error');
            }
        },
        error: function (error) {
            console.log(error);
            Swal.fire('Error', 'An error occurred', 'error');
        }
    });
}

function updateTask(taskId, _TaskTitle, _TaskDesc, _TaskUser, _TaskStatus) {

    var updatedtask = {
        Id: taskId,
        TaskTitle: _TaskTitle,
        TaskDesc: _TaskDesc,
        TaskUser: _TaskUser,
        TaskStatus: _TaskStatus,
    };
    $.ajax({
        url: '/Tasks/UpdateTask',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(updatedtask),
        success: function () {
            // Handle success, e.g., display a success message
            if (isAdminUser) {
                getAllTasks()
            } else {
                GetTasksByUser(currentUserId)
            }
            Swal.fire('Success', 'Task updated successfully', 'success');
        },
        error: function (error) {
            console.log(error);
            Swal.fire('Error', 'Failed to update task', 'error');
            // Handle the error
        }
    });
}


function ApproveTask(taskId, _ApproveStatus, _AdminRemarks) {
    var _TaskStatus = '_done'
    if (_ApproveStatus == 'Not Approved') {
        _TaskStatus = '_inprogress'
	}
    var ApproveTask = {
        Id: taskId,
        TaskStatus: _TaskStatus,
        ApproveStatus: _ApproveStatus,
        ApprovedBy: currentUser,
        AdminRemarks: _AdminRemarks
    };
    $.ajax({
        url: '/Tasks/ApproveTask',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ApproveTask),
        success: function () {
            // Handle success, e.g., display a success message
            if (isAdminUser) {
                getAllTasks()
            } else {
                GetTasksByUser(currentUserId)
            }
            Swal.fire('Success', 'Task updated successfully', 'success');
        },
        error: function (error) {
            console.log(error);
            Swal.fire('Error', 'Failed to update task', 'error');
            // Handle the error
        }
    });
}


function getAllTasks() {
    $.ajax({
        url: '/Tasks/GetAllTasks', // Replace with the actual URL of your action method
        type: 'GET',
        dataType: 'json',
        success: function (tasks) {
            // Handle the retrieved tasks
            initKanban()
            $.each(tasks, function (index, task) {
                displayTask(task.id, task.taskTitle, task.taskDesc, task.taskUser, task.taskStatus, task.createdBy, task.adminRemarks)
            });
            
        },
        error: function (error) {
            console.log(error);
            // Handle the error
        }
    });
}

function GetTasksByUser(username) {
    $.ajax({
        url: '/Tasks/GetTasksByUser', // Replace with the actual URL of your action method
        type: 'GET',
        dataType: 'json',
        data: { username: username },
        success: function (tasks) {
            // Handle the retrieved tasks
            initKanban()
            $.each(tasks, function (index, task) {
                displayTask(task.id, task.taskTitle, task.taskDesc, task.taskUser, task.taskStatus, task.createdBy, task.adminRemarks)
            });

        },
        error: function (error) {
            console.log(error);
            // Handle the error
        }
    });
}


function assignUserToAdminRole(userId) {
    $.ajax({
        url: '/User/AssignUserToAdminRole',
        type: 'POST',
        data: { userId: userId },
        success: function () {
            // Handle success, e.g., display a success message
            console.log('User assigned to Admin role successfully');
        },
        error: function (error) {
            console.log(error);
            // Handle the error
        }
    });
}


function displayTask(_TaskId, _TaskTitle, _TaskDesc, _TaskUser, _TaskStatus, _CreatedBy, _AdminRemarks) {
    KanbanEl.addElement(_TaskStatus, {
        title: _TaskTitle,
        desc: _TaskDesc,
        status: _TaskStatus,
        username: _TaskUser,
        id: _TaskId,
        click: function (el) {
            Swal.fire({
                title: "<strong>Edit Task</strong>",
                //icon: "info",
                html: htmlText('Edit', _TaskTitle, _TaskDesc, 'onEditTaskStatusChange()', _TaskStatus, _TaskUser, _TaskId, _AdminRemarks)
                ,
                showCloseButton: true,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
                confirmButtonText: "Save",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    if (_TaskStatus != '_done') {
                        if ($('#EditTaskUser').parent().parent().css('display') == 'none') {
                            updateTask(_TaskId, $('#EditTaskTitle').val(), $('#EditTaskDesc').val(), '', $('#EditTaskStatus').val())
                        } else {
                            updateTask(_TaskId, $('#EditTaskTitle').val(), $('#EditTaskDesc').val(), $('#EditTaskUser').val(), $('#EditTaskStatus').val())
                        }
                    } else {
                        if (isAdminUser) {
                            ApproveTask(_TaskId, $('#EditTaskApproval').val(), $('#EditAdminRemarks').val())
                        }
                        
					}
                    
                    
                    
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
            //new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
            new QRCode("qrcode", {
                text: _TaskId+"",
                width: 128,
                height: 128,
            });
            $("#EditTaskStatus").val(_TaskStatus).change();
            $("#EditTaskUser").val(_TaskUser).change();
        },
    });

    $("#EditTaskStatus").val(_TaskStatus).change();
    $("#EditTaskUser").val(_TaskUser).change();
}
//var addBoardDefault = document.getElementById("addDefault");
//addBoardDefault.addEventListener("click", function () {
//    KanbanTest.addBoards([
//        {
//            id: "_default",
//            title: "Kanban Default",
//            item: [
//                {
//                    title: "Default Item"
//                },
//                {
//                    title: "Default Item 2"
//                },
//                {
//                    title: "Default Item 3"
//                }
//            ]
//        }
//    ]);
//});

//var removeBoard = document.getElementById("removeBoard");
//removeBoard.addEventListener("click", function () {
//    KanbanTest.removeBoard("_done");
//});

//var removeElement = document.getElementById("removeElement");
//removeElement.addEventListener("click", function () {
//    KanbanTest.removeElement("_test_delete");
//});

//var allEle = KanbanTest.getBoardElements("_todo");
//allEle.forEach(function (item, index) {
//    //console.log(item);
//});