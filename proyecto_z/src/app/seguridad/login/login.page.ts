import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private raindrops: { x: number, y: number, speed: number, length: number }[] = [];
  private maxRaindrops: number = 50;

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private alertController: AlertController) { }

  async login() {
    try {
      await this.authService.login(this.email, this.password);

      await this.router.navigate(['/home']);

      const alert = await this.alertController.create({
        header: 'Bienvenido',
        message: `Hola ${this.email}, bienvenido a la aplicación`,
        buttons: ['OK']
      });
      await alert.present();

    } catch (error) {

      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Los datos no coinciden. Inténtalo nuevamente.',
        buttons: ['OK']
      });
      await errorAlert.present();

      console.error('Error en el login:', error);
    }
  }

  ngOnInit(): void {
    // Aquí no necesitas hacer nada por ahora
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('rainfall') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.resizeCanvas();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createRaindrop() {
    const x = Math.random() * this.canvas.width;
    const y = -5;
    const speed = Math.random() * 5 + 2;
    const length = Math.random() * 20 + 10;

    this.raindrops.push({ x, y, speed, length });
  }

  private updateRaindrops() {
    for (let i = 0; i < this.raindrops.length; i++) {
      const raindrop = this.raindrops[i];
      raindrop.y += raindrop.speed;

      if (raindrop.y > this.canvas.height) {
        this.raindrops.splice(i, 1);
        i--;
      }
    }
  }

  private drawRaindrops() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = 'aqua';
    this.ctx.lineWidth = 2;

    for (const raindrop of this.raindrops) {
      this.ctx.beginPath();
      this.ctx.moveTo(raindrop.x, raindrop.y);
      this.ctx.lineTo(raindrop.x, raindrop.y + raindrop.length);
      this.ctx.stroke();
    }
  }

  private animate() {
    if (this.raindrops.length < this.maxRaindrops) {
      this.createRaindrop();
    }
    this.updateRaindrops();
    this.drawRaindrops();

    requestAnimationFrame(() => this.animate());
  }
}

