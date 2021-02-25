import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Partido } from '../_models/Partido';
import { PartidoService } from '../_services/partido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
})
export class PartidoComponent implements OnInit {
  partidos: Partido[] = [];
  partido;
  registerForm;
  modoSalvar = 'post';
  bodyDeletarEvento = '';
  loading = false;
  p: number = 1;
  listaFiltro;

  _filtro;
  get filtro(): string {
    return this._filtro;
  }
  set filtro(value: string) {
    this._filtro = value;
    this.listaFiltro = this.filtro
      ? this.filtrarPartidos(this.filtro)
      : this.partidos;
  }

  constructor(
    private partidoService: PartidoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllPartidos();
    this.validation();
  }

  excluirPartido(partido: Partido, template: any) {
    this.openModal(template);
    this.partido = partido;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o partido ${partido.descricao}?`;
  }

  confirmeDelete(template: any) {
    this.partidoService.deletePartido(this.partido.id).subscribe(
      () => {
        template.hide();
        this.toastr.success('Partido excluído com sucesso.');
        this.getAllPartidos();
      },
      (error) => {
        this.toastr.error('Erro ao excluir partido.');
        console.log(error);
      }
    );
  }

  editarPartido(partido: Partido, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.partido = partido;
    this.registerForm.patchValue(partido);
  }

  filtrarPartidos(descricao: string): Partido[] {
    descricao = descricao.toLocaleLowerCase();

    return this.partidos.filter(
      (partido) =>
        partido.descricao.toLocaleLowerCase().indexOf(descricao) !== -1
    );
  }

  novoPartido(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  getAllPartidos() {
    this.loading = true;

    this.partidoService.getAllPartidos().subscribe(
      (_partidos: Partido[]) => {
        this.partidos = _partidos;
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

  postPartido(template: any) {
    if (this.registerForm.valid) {
      this.loading = true;

      if (this.modoSalvar === 'post') {
        this.partido = Object.assign({}, this.registerForm.value);
        this.partidoService.postPartido(this.partido).subscribe(
          () => {
            template.hide();
            this.getAllPartidos();
            this.loading = false;
            this.toastr.success('Partido cadastrado com sucesso.');
          },
          (error) => {
            this.toastr.error('Erro ao cadastrar partido.');
            console.log(error);
          }
        );
      } else {
        this.partido = Object.assign(
          { id: this.partido.id },
          this.registerForm.value
        );
        this.partidoService.putPartido(this.partido).subscribe(
          () => {
            template.hide();
            this.getAllPartidos();
            this.loading = false;
            this.toastr.success('Partido atualizado com sucesso.');
          },
          (error) => {
            this.toastr.error('Erro ao atualizar partido.');
            console.log(error);
          }
        );
      }
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      sigla: ['', Validators.required],
    });
  }
}
