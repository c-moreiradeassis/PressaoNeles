import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Deputado } from '../_models/Deputado';
import { DeputadoService } from '../_services/deputado.service';

@Component({
  selector: 'app-deputado',
  templateUrl: './deputado.component.html',
  styleUrls: ['./deputado.component.css'],
})
export class DeputadoComponent implements OnInit {
  deputado;
  deputados;
  registerForm;
  p: number = 1;
  loading = false;
  bodyDeletarDeputado = '';
  modoSalvar = 'post';

  constructor(
    private deputadoService: DeputadoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getDeputados();
    this.validation();
  }

  confirmDelete(confirm: any) {
    this.deputadoService.deleteDeputado(this.deputado.id).subscribe(
      () => {
        confirm.hide();
        this.getDeputados();
        this.toastr.success('Deputado excluído com sucesso.');
      },
      (error) => {
        this.toastr.error('Erro ao excluir deputado.');
        console.log(error);
      }
    );
  }

  editarForm(deputado: Deputado, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.deputado = deputado;
    this.registerForm.patchValue(deputado);
  }

  excluirDeputado(deputado: Deputado, confirm: any) {
    this.openModal(confirm);
    this.deputado = deputado;
    this.bodyDeletarDeputado = `Tem certeza que deseja excluir o deputado ${deputado.nome}?`;
  }

  getDeputados() {
    this.loading = true;

    this.deputadoService.getDeputados().subscribe(
      (resposta: Deputado[]) => {
        this.deputados = resposta;
      },
      (error) => {
        console.log(error);
      }
    );

    this.loading = false;
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  novoDeputado(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  postDeputado(template: any) {
    if (this.registerForm.valid) {
      this.loading = true;

      if ((this.modoSalvar = 'post')) {
        this.deputado = Object.assign({}, this.registerForm.value);

        this.deputadoService.postDeputado(this.deputado).subscribe(
          () => {
            template.hide();
            this.getDeputados();
            this.loading = false;
            this.toastr.success('Deputado cadastrado com sucesso.');
          },
          (error) => {
            this.toastr.error('Erro ao excluir o deputado.');
          }
        );
      } else {
        this.deputado = Object.assign(
          { id: this.deputado.id },
          this.registerForm.value
        );

        this.deputadoService.putDeputado(this.deputado).subscribe(
          () => {
            template.hide();
            this.getDeputados();
            this.loading = true;
            this.toastr.success('Deputado atualizado com sucesso.');
          },
          (error) => {
            this.toastr.error('Erro ao excluir o deputado.');
            console.log(error);
          }
        );
      }
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      facebook: [''],
      twitter: [''],
    });
  }
}
