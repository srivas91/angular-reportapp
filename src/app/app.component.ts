import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CdkTableExporterModule } from 'cdk-table-exporter';
export interface employee {
  empid: number;
  empname: string;
  designation: string;
  dept:string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends CdkTableExporterModule{
  title = 'export-table-data-to-pdf-using-jspdf-example';

  // head = ['ID', 'NAME', 'DESIGNATION', 'DEPARTMENT'];
  displayedColumns: string[] = ['empid', 'empname', 'designation','dept'];

  empdata:employee[] = [
    {
      "empid": 101,
  "empname": "ROBERT",
  "designation":"QA",
  "dept":"testing"
    },
    {
      "empid": 102,
  "empname": "VIVEK",
  "designation":"HR",
  "dept":"admin"
    },
    {
      "empid": 103,
  "empname": "MADHAN",
  "designation":"developer",
  "dept":"development"
    }
    
  ]
 dataSource=this.empdata;
  createPdf() {
    var doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('My Team Detail', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.displayedColumns,
      body: this.empdata,
      theme: 'plain',
      didDrawCell: (data: { column: { index: any; }; }) => {
        console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('myteamdetail.pdf');
  }

}
