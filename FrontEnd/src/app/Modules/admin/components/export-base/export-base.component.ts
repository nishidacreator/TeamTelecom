import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { AdminService } from '../../admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TelecallerService } from 'src/app/Modules/telecaller/telecaller.service';

@Component({
  selector: 'app-export-base',
  templateUrl: './export-base.component.html',
  styleUrls: ['./export-base.component.scss']
})
export class ExportBaseComponent {

  constructor(private adminService: AdminService, private fb: FormBuilder, private tealeCallerService: TelecallerService){}

  exportForm = this.fb.group({
    type: ['', Validators.required],
    projectId: ['', Validators.required]
  })

  ngOnInit(){
    this.getProject()
  }

  project$!: Observable<Project[]>
  getProject() {
    this.project$ = this.adminService.getProject()
  }

  type = [{type: "Base"}, {type: "FollowUp"}]
  status = [{type: "RNR"}, {type: "CallBusy"}, {type: "CallBack"},{type: "Answered"}, {type: "All"}]

  bsnl: any[] = [];
  data: any[] = [];
  fileName!: string
  makeExcel(){
    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];


    if(this.exportForm.getRawValue().type === 'Base'){
      const excludedFields = ['teleCallerId', 'projectId', 'teleCaller', 'project'];

        this.adminService.getProjectById(this.exportForm.getRawValue().projectId).subscribe((res)=>{

          if(res.projectName.toLowerCase() === 'bsnl'){
                   // Specify the file name with the current date
            this.fileName = `bsnl_base${formattedDate}.csv`;

            this.tealeCallerService.getBsnlCaller().subscribe(res=>{
              console.log(res)
              this.data = res


              // EXCEL
              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  const value = client[key];
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }
              console.log(this.bsnl)

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();

              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'asianet'){
            // Specify the file name with the current date
            this.fileName = `asianet_base${formattedDate}.csv`;

            this.tealeCallerService.getAsianetCaller().subscribe(res=>{
              console.log(res)
              this.data = res


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  const value = client[key];
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }
              console.log(this.bsnl)

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();

              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'bajaj'){
            // Specify the file name with the current date
            this.fileName = `bajaj_base${formattedDate}.csv`;

            this.tealeCallerService.getBajajCaller().subscribe(res=>{
              console.log(res)
              this.data = res


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  const value = client[key];
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }
              console.log(this.bsnl)

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();

              this.bsnl = [];

            })
          }

          else if(res.projectName.toLowerCase() === 'vi'){
            // Specify the file name with the current date
            this.fileName = `vi_base${formattedDate}.csv`;

            this.tealeCallerService.getViCaller().subscribe(res=>{
              console.log(res)
              this.data = res


              // Get the headings based on the first client object
              const firstClient = this.data[0];
              const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

              const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

              // Push the headings to the clientArray
              this.bsnl.push(formattedHeadings);

              // Iterate over each client in the array
              for (let i = 0; i < this.data.length; i++) {
                const client: any = this.data[i];
                const newRow: any = [];

                // Iterate over each property of the client object
                for (let key of headings) {
                  const value = client[key];
                  newRow.push(value);
                }

                this.bsnl.push(newRow);
              }
              console.log(this.bsnl)

              // Generate CSV string
              let csvString = '';
              this.bsnl.forEach((rowItem: any) => {
                rowItem.forEach((colItem: any) => {
                  csvString += colItem + ',';
                });
                csvString += '\r\n';
              });

              // Create a download link for the CSV file
              csvString = 'data:application/csv,' + encodeURIComponent(csvString);
              const link = document.createElement('a');
              link.setAttribute('href', csvString);
              link.setAttribute('download', this.fileName);
              document.body.appendChild(link);
              link.click();

              this.bsnl = [];

            })
          }
        })
    }else{

      const excludedFields = ['teleCallerId', 'projectId', 'caller', 'project'];

      this.adminService.getProjectById(this.exportForm.getRawValue().projectId).subscribe((res)=>{

        if(res.projectName.toLowerCase() === 'bsnl'){
                 // Specify the file name with the current date
          this.fileName = `bsnl_followup${formattedDate}.csv`;

          this.tealeCallerService.getFollowUpCaller().subscribe(res=>{
            console.log(res)
            this.data = res



            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                const value = client[key];
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }
            console.log(this.bsnl)

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();

            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'asianet'){
          // Specify the file name with the current date
          this.fileName = `asianet_followup${formattedDate}.csv`;

          this.tealeCallerService.getAsianetSalesFollowUpCaller().subscribe(res=>{
            console.log(res)
            this.data = res


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                const value = client[key];
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }
            console.log(this.bsnl)

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();

            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'bajaj'){
          // Specify the file name with the current date
          this.fileName = `bajaj_followup${formattedDate}.csv`;

          this.tealeCallerService.getBajajFollowUpCaller().subscribe(res=>{
            console.log(res)
            this.data = res


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient).filter(key => !excludedFields.includes(key));

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                const value = client[key];
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }
            console.log(this.bsnl)

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();

            this.bsnl = [];

          })
        }

        else if(res.projectName.toLowerCase() === 'vi'){
          // Specify the file name with the current date
          this.fileName = `vi_followup${formattedDate}.csv`;

          this.tealeCallerService.getViFollowUpCaller().subscribe(res=>{
            console.log(res)
            this.data = res


            // Get the headings based on the first client object
            const firstClient = this.data[0];
            const headings = Object.keys(firstClient);

            const formattedHeadings = headings.map(heading => `-- ${heading.toUpperCase()} --`);

            // Push the headings to the clientArray
            this.bsnl.push(formattedHeadings);

            // Iterate over each client in the array
            for (let i = 0; i < this.data.length; i++) {
              const client: any = this.data[i];
              const newRow: any = [];

              // Iterate over each property of the client object
              for (let key of headings) {
                const value = client[key];
                newRow.push(value);
              }

              this.bsnl.push(newRow);
            }
            console.log(this.bsnl)

            // Generate CSV string
            let csvString = '';
            this.bsnl.forEach((rowItem: any) => {
              rowItem.forEach((colItem: any) => {
                csvString += colItem + ',';
              });
              csvString += '\r\n';
            });

            // Create a download link for the CSV file
            csvString = 'data:application/csv,' + encodeURIComponent(csvString);
            const link = document.createElement('a');
            link.setAttribute('href', csvString);
            link.setAttribute('download', this.fileName);
            document.body.appendChild(link);
            link.click();

            this.bsnl = [];

          })
        }
      })
    }
    this.clearControls();
  }

  clearControls(){
    this.exportForm.reset()
    this.exportForm.setErrors(null)
    Object.keys(this.exportForm.controls).forEach(key=>{this.exportForm.get(key)?.setErrors(null)})
  }
}
