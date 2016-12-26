var columnDefs = [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price"}
];

var rowData = [
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxter", price: 72000}
];

var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData
};

// wait for the document to be loaded, otherwise
// ag-Grid will not find the div in the document.

    $('#edit-events').click(function () {
		$('#client-sub-navigation').removeClass('open');
        $('#project-sub-navigation').removeClass('open');
		$('#project-editor').removeClass('open');
        $('#job-sub-navigation').removeClass('open');
		$('#job-editor').removeClass('open');
        $('#event-editor').addClass('open');
        $('#editor').removeClass('open');
        var eGridDiv = document.querySelector('#event-editor');
        new agGrid.Grid(eGridDiv, gridOptions);
    	});

