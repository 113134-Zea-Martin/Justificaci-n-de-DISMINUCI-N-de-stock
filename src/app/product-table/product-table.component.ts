import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
declare var bootstrap: any; // Asegúrate de que el tipo bootstrap sea accesible

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html'
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  products: (Product & { selected: boolean })[] = [];
  selectAll: boolean = false;

  @Output() selectedProductsChange = new EventEmitter<number[]>(); // Para emitir los IDs seleccionados

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    // Inicializa los tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl: any) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({ ...product, selected: false }));
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }

  // Cambia el estado de selección de todos los productos
  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.products.forEach(product => product.selected = isChecked);
    this.selectAll = isChecked;
    this.emitSelectedProducts(); // Emitir los seleccionados
  }

  // Actualiza el checkbox de "Seleccionar todos" dependiendo de la selección individual
  updateSelectAll() {
    this.selectAll = this.products.every(product => product.selected);
    this.emitSelectedProducts(); // Emitir los seleccionados
  }

  // Función para emitir los IDs seleccionados
  emitSelectedProducts() {
    const selectedIds = this.products
      .filter(product => product.selected)
      .map(product => product.id);
    this.selectedProductsChange.emit(selectedIds); // Emitir los IDs seleccionados
  }
}
