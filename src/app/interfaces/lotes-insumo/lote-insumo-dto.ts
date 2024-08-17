import { IInsumo } from '../insumo.interface';
import { Proveedor } from '../proveedores/proveedor';
import { ApplicationUserDTO } from '../usuarios/application-user-dto';

export interface LoteInsumoDTO {
  id: number;
  proveedor: Proveedor;
  insumo: IInsumo;
  usuario: ApplicationUserDTO;
  fechaCaducidad: string;
  cantidad: number;
  caducado: number;
  fechaCompra: string;
  precioUnidad: number;
  montoCompra: number;
  merma: number;
  numeroProducciones: number;
}
