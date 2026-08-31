import {Component} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqItems = [
    {
      question: 'Собираете ли вы подарочные боксы?',
      answer: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!',
      isOpen: false
    },
    {
      question: 'Сколько у вас разновидностей чая?',
      answer: 'Несколько десятков сортов и каждый месяц появляются новые.',
      isOpen: false
    },
    {
      question: 'В какой срок осуществляется доставка?',
      answer: 'Отгрузка осуществляется в течение 24 часов. Точный срок доставки зависит от вашего местоположения и выбранного вами способа отправки.',
      isOpen: false
    },
    {
      question: 'У вас обновляется ассортимент?',
      answer: 'Да, обновление ассортимента происходит как минимум раз в месяц. Мы постоянно придумываем и собираем новые вкусные и полезные чайные смеси.',
      isOpen: false
    },
    {
      question: 'Какого объема у вас пачки чая?',
      answer: 'Наш чай расфасован с пакеты от 50 гр.',
      isOpen: false
    }
  ];

  toggle(item: any): void {
    const wasOpen = item.isOpen;
    this.faqItems.forEach(i => i.isOpen = false);
    item.isOpen = !wasOpen;
  }
}

