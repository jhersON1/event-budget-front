import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  standalone: true,
  imports: [],
  templateUrl: './my-message.component.html',
  styleUrl: './my-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMessageComponent {
  @Input({ required: true }) text!: string;

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
