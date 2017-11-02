// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ItemModel } from '@syncfusion/ej2-navigations';
// import { gridData1 } from './data';
// import {ToolbarItems, IEditCell ,Column, SaveEventArgs} from '@syncfusion/ej2-ng-grids';
// import {DropDownList} from '@syncfusion/ej2-dropdowns';
// import {DataManager, Query} from '@syncfusion/ej2-data';

// @Component({
//     selector: 'my-app',
//     template: ` <form><ej-grid #grid [dataSource]='data' [allowFiltering]='true' [editSettings]='editSetting' 
//     (dataBound)='dataBoundHandler()' [toolbar]='toolbarItems' (toolbarClick)='tClick($event)'>
//                 <e-columns>
//                     <e-column field='No' [isPrimaryKey]='true' [visible]='false'></e-column>
//                     <e-column field='Cityid' headerText='City ID' width=120 [edit]='customEditCell' [valueAccessor]='formatter'></e-column>
//                 </e-columns>
//                 </ej-grid> </form>

//                 <ng-template #template>
//                   <span>DataCount - {{dataCount}}</span>
//                 </ng-template>
//                 <ng-template #template1>
//                 <button type='button'>Print</button>
//               </ng-template>`
// })
// export class AppComponent implements OnInit {

//     public data: Object[];

//     @ViewChild('grid')
//     public grid;
//     @ViewChild('template')
//     public rowCount;
//     @ViewChild('template1')
//     public refresh;
//     public editSetting: Object;
//     public validationRules;
//     public toolbarItems: (ToolbarItems | ItemModel)[];
//     public customEditCell:IEditCell;

//     public dataCount;
//     public dropdownObj: DropDownList;
//     public dropDownDs= [{ShipCity: 'mumbai' , CityID:1 }, {ShipCity:'chennai' , CityID: 2 },
//     {ShipCity:'Pune' , CityID: 3}, {ShipCity:'Delhi' , CityID: 4}, {ShipCity:'Kolkatta' , CityID: 5}];
//     public formatter = (field, data)=> {
//         return this.dropDownDs[data['Cityid']-1]['ShipCity'];
//     }

//     ngOnInit(): void {
//         // local dataSource with ShipCity and ShipID
//         this.data = [{No: 1, Cityid: 1}, {No: 2, Cityid: 2}, {No: 3, Cityid: 3}, {No: 4, Cityid: 4}, {No: 5, Cityid: 5}];
//         this.toolbarItems = ['add', 'delete', 'cancel', 'update', 'edit', {template: this.rowCount}, {template: this.refresh}];
//         this.validationRules= {required:true};
//         this.editSetting= {allowEditing: true, allowDeleting: true, allowAdding: true};
//         this.customEditCell = {create: this.create.bind(this), read: this.read.bind(this), write: this.write.bind(this)};
//     }
//     tClick(){
//         this.grid.print();
//     }

//     // editComplete(args: SaveEventArgs){
//     //     if(args.requestType==='save'){
//     //         // To change the selected city in dataSource.
//     //         let index = this.data.indexOf(args.data);
//     //         this.data[index]['ShipCity']= this.selectedCity;
//     //     }
//     // }
//     // create custom edit cell element
//     create(){
//         let div = document.createElement('input');
//         return div;
//     }
//     // read the edited value to save dataSource.
//     read(args) {
//         // The returned value is updated in dataSource with column.field property.
//         return this.dropdownObj.value;
//     }
//     // create Custom Edit cell 
//     write(args: { rowData: Object, element: Element, column: Column, requestType: string }){
//         this.dropdownObj = new DropDownList(
//             {
//                 dataSource: new DataManager(<any>this.dropDownDs),
//                 fields: { text: 'ShipCity', value: 'CityID' }, text: this.dropDownDs[args.rowData['Cityid']-1].ShipCity, popupHeight: '200px',
//             });
//             this.dropdownObj.appendTo(args.element as HTMLElement);
//     }

//     dataBoundHandler() {
//       // update data count
//       this.dataCount = this.grid.currentViewData.length;
//     }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import {IEditCell ,Column} from '@syncfusion/ej2-ng-grids';
import {DropDownList} from '@syncfusion/ej2-dropdowns';
import {DataManager} from '@syncfusion/ej2-data';

@Component({
    selector: 'my-app',
    template: ` <form><ej-grid #grid [dataSource]='data'[editSettings]='editSetting'>
                <e-columns>
                    <e-column field='No' [isPrimaryKey]='true' [visible]='false'></e-column>
                    <e-column field='Cityid' headerText='City ID' width=120 [edit]='customEditCell' [valueAccessor]='formatter'></e-column>
                </e-columns>
                </ej-grid> </form>`
})
export class AppComponent implements OnInit {

    public data: Object[];

    @ViewChild('grid')
    public grid;
    public editSetting: Object;
    public customEditCell:IEditCell;
    public dropdownObj: DropDownList;
    // dropdown datasource
    public dropDownDs= [{ShipCity: 'mumbai' , CityID:1 }, {ShipCity:'chennai' , CityID: 2 },
    {ShipCity:'Pune' , CityID: 3}, {ShipCity:'Delhi' , CityID: 4}, {ShipCity:'Kolkatta' , CityID: 5}];

     // format/change the grid cell value using the formatter function
    public formatter = (field, data)=> {
        return this.dropDownDs[data['Cityid']-1]['ShipCity'];
    }

    ngOnInit(): void {
        // local dataSource for grid
        this.data = [{No: 1, Cityid: 1}, {No: 2, Cityid: 2}, {No: 3, Cityid: 3}, {No: 4, Cityid: 4}, {No: 5, Cityid: 5}];
        this.editSetting= {allowEditing: true, allowDeleting: true, allowAdding: true};
        this.customEditCell = {create: this.create.bind(this), read: this.read.bind(this), write: this.write.bind(this)};
    }
    
    // create custom edit cell element
    create(){
        let div = document.createElement('input');
        return div;
    }
    // read the edited value to save dataSource.
    read(args) {
        // The returned value is updated in dataSource with column.field property.
        return this.dropdownObj.value;
    }
    // create Custom Edit cell 
    write(args: { rowData: Object, element: Element, column: Column, requestType: string }){
        this.dropdownObj = new DropDownList(
            {
                dataSource: new DataManager(<any>this.dropDownDs),
                fields: { text: 'ShipCity', value: 'CityID' }, text: this.dropDownDs[args.rowData['Cityid']-1].ShipCity, popupHeight: '200px',
            });
            this.dropdownObj.appendTo(args.element as HTMLElement);
    }
}

