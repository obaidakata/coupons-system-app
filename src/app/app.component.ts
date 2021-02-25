import {Component, OnInit} from '@angular/core';
import {CompanyService} from './services/company.service';
import {AdminService} from './services/admin.service';
import {Company} from './dataTypes/company';
import {HttpErrorResponse} from '@angular/common/http';
import {element} from 'protractor';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public companies: Company[] | undefined;
  public editCompany: Company | null | undefined;
  public deleteCompany: Company | null | undefined;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void
  {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.adminService.getAllCompanies().subscribe(
      (response: Company[]) => {
        console.log('getCompanies');
        this.companies = response;
        this.companies.forEach(value => value.imageUrl = 'assets/images/' + value.name + '.png');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(company: Company | null, mode: string): void {
    const companyContainer = document.getElementById('company-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCompanyModal');
    }
    else if (mode === 'edit') {
      this.editCompany = company;
      button.setAttribute('data-target', '#updateCompanyModal');
    }
    else if (mode === 'delete') {
      this.deleteCompany = company;
      button.setAttribute('data-target', '#deleteCompanyModal');
    }

    companyContainer?.appendChild(button);
    button.click();
  }

  public onAddCompany(addForm: NgForm): void{
    document.getElementById('add-company-form')?.click();
    console.log(addForm.value);
    this.adminService.addCompany(addForm.value).subscribe(
      (response: Company) => {
          console.log(response);
          this.getCompanies();
          addForm.reset();
      },
      (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
      }
    );
  }
  public onUpdateCompany(company: Company): void{
    console.log(company);
    this.adminService.updateCompany(company).subscribe(
      (response: Company) => {
        console.log(response);
        this.getCompanies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteCompany(companyId: number| undefined): void{
    console.log(companyId);
    if (companyId !== undefined)
    {
      this.adminService.deleteCompany(companyId).subscribe(
        (response: void) => {
          console.log(response);
          this.getCompanies();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  public searchCompanies(key: string): void {
    if (this.companies !== undefined) {
      const results: Company[] = [];
      for (const company of this.companies) {
          if (company.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
          || company.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
            results.push(company);
          }
      }
      this.companies = results;
      if (results.length === 0  || !key) {
        this.getCompanies();
      }
    }
  }
}
