import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface User {
  name: string;
  balance: number;
  email: string;
  isDemo?: boolean;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const startDemoMode = () => {
    setUser({
      name: 'Демо игрок',
      balance: 5000,
      email: 'demo@example.com',
      isDemo: true
    });
    toast({
      title: 'Демо режим активирован!',
      description: 'Демо баланс 5000₽. Зарегистрируйтесь для реальной игры',
    });
  };

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    setUser({
      name: name || 'Игрок',
      balance: 10000,
      email: email
    });
    setIsAuthOpen(false);
    toast({
      title: authMode === 'login' ? 'Добро пожаловать!' : 'Регистрация успешна!',
      description: 'Бонус 10000₽ зачислен на баланс',
    });
  };

  const handleDeposit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get('amount'));

    if (user?.isDemo) {
      toast({
        title: 'Демо режим',
        description: 'Зарегистрируйтесь для пополнения реальными деньгами',
        variant: 'destructive',
      });
      return;
    }

    if (user) {
      setUser({ ...user, balance: user.balance + amount });
      setIsDepositOpen(false);
      toast({
        title: 'Пополнение успешно!',
        description: `Зачислено ${amount}₽ через СБП`,
      });
    }
  };

  const handleWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get('amount'));

    if (user?.isDemo) {
      toast({
        title: 'Демо режим',
        description: 'Зарегистрируйтесь для вывода реальных средств',
        variant: 'destructive',
      });
      return;
    }

    if (user && user.balance >= amount) {
      setUser({ ...user, balance: user.balance - amount });
      setIsWithdrawOpen(false);
      toast({
        title: 'Вывод оформлен!',
        description: `${amount}₽ будет зачислено в течение 5 минут`,
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Недостаточно средств',
        variant: 'destructive',
      });
    }
  };

  const games = {
    slots: [
      { id: 1, name: 'Lucky 7', provider: 'NetEnt', jackpot: '2.5M ₽', hot: true },
      { id: 2, name: 'Fruit Party', provider: 'Pragmatic', jackpot: '890K ₽', hot: true },
      { id: 3, name: 'Gates of Olympus', provider: 'Pragmatic', jackpot: '1.2M ₽', hot: false },
      { id: 4, name: 'Sweet Bonanza', provider: 'Pragmatic', jackpot: '750K ₽', hot: true },
      { id: 5, name: 'Book of Dead', provider: 'Play\'n GO', jackpot: '450K ₽', hot: false },
      { id: 6, name: 'Starlight Princess', provider: 'Pragmatic', jackpot: '1.8M ₽', hot: true },
    ],
    roulette: [
      { id: 7, name: 'European Roulette', provider: 'Evolution', type: 'Live', hot: true },
      { id: 8, name: 'Lightning Roulette', provider: 'Evolution', type: 'Live', hot: true },
      { id: 9, name: 'Russian Roulette', provider: 'Evolution', type: 'Live', hot: false },
    ],
    poker: [
      { id: 10, name: 'Texas Hold\'em', provider: 'PokerStars', players: 234, hot: true },
      { id: 11, name: 'Omaha Poker', provider: 'PokerStars', players: 89, hot: false },
      { id: 12, name: 'Casino Hold\'em', provider: 'Evolution', players: 156, hot: true },
    ]
  };

  const promos = [
    { title: 'Приветственный бонус', description: '100% на первый депозит до 50 000₽', code: 'WELCOME100' },
    { title: 'Кэшбэк 10%', description: 'Еженедельный возврат проигрыша', code: 'CASHBACK10' },
    { title: 'Фриспины', description: '50 бесплатных вращений', code: 'FREE50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221B3A] to-[#1A1F2C]">
      <header className="border-b border-primary/20 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow">
                <span className="text-2xl">🎰</span>
              </div>
              <h1 className="text-2xl font-bold neon-text">КЕРЖ</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#games" className="text-sm hover:text-primary transition-colors">Игры</a>
              <a href="#slots" className="text-sm hover:text-primary transition-colors">Слоты</a>
              <a href="#roulette" className="text-sm hover:text-primary transition-colors">Рулетка</a>
              <a href="#poker" className="text-sm hover:text-primary transition-colors">Покер</a>
              <a href="#promos" className="text-sm hover:text-primary transition-colors">Промо</a>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Card className="bg-card/50 border-primary/30">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">Баланс</p>
                          {user.isDemo && (
                            <Badge variant="secondary" className="text-xs">ДЕМО</Badge>
                          )}
                        </div>
                        <p className="text-lg font-bold text-accent gold-glow">{user.balance.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 neon-glow">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Пополнить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-primary/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Пополнение через СБП</DialogTitle>
                        <DialogDescription>Моментальное зачисление средств</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleDeposit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Сумма пополнения</Label>
                          <Input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="5000"
                            min="100"
                            required
                            className="bg-input border-primary/30"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={() => (document.getElementById('amount') as HTMLInputElement).value = '1000'}>
                            1000₽
                          </Button>
                          <Button type="button" variant="outline" onClick={() => (document.getElementById('amount') as HTMLInputElement).value = '5000'}>
                            5000₽
                          </Button>
                          <Button type="button" variant="outline" onClick={() => (document.getElementById('amount') as HTMLInputElement).value = '10000'}>
                            10000₽
                          </Button>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow">
                          Пополнить через СБП
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-primary/30">
                        <Icon name="ArrowDownToLine" size={16} className="mr-2" />
                        Вывести
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-primary/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Вывод средств</DialogTitle>
                        <DialogDescription>Вывод через СБП за 5 минут</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleWithdraw} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="withdraw-amount">Сумма вывода</Label>
                          <Input
                            id="withdraw-amount"
                            name="amount"
                            type="number"
                            placeholder="5000"
                            min="100"
                            max={user.balance}
                            required
                            className="bg-input border-primary/30"
                          />
                          <p className="text-xs text-muted-foreground">Доступно: {user.balance.toLocaleString('ru-RU')}₽</p>
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 gold-glow">
                          Вывести на карту
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="ghost" size="icon">
                    <Icon name="User" size={20} />
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-accent/50 text-accent hover:bg-accent/10"
                    onClick={startDemoMode}
                  >
                    <Icon name="Play" size={16} className="mr-2" />
                    Демо режим
                  </Button>
                  <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 neon-glow">
                        <Icon name="LogIn" size={16} className="mr-2" />
                        Войти
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-primary/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {authMode === 'login' ? 'Вход' : 'Регистрация'}
                        </DialogTitle>
                        <DialogDescription>
                          {authMode === 'login' ? 'Войдите в аккаунт' : 'Создайте новый аккаунт и получите бонус 10000₽'}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Введите имя"
                            required
                            className="bg-input border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            className="bg-input border-primary/30"
                          />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow">
                          {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                        <Button
                          type="button"
                          variant="link"
                          className="w-full"
                          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                        >
                          {authMode === 'login' ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 border border-primary/30 neon-glow">
          <div className="relative z-10 max-w-2xl">
            <Badge className="mb-4 bg-accent text-accent-foreground gold-glow">Бонус 100%</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
              Добро пожаловать в КЕРЖ!
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              Получите 100% на первый депозит + 50 фриспинов. Моментальный вывод через СБП!
            </p>
            <div className="flex flex-wrap gap-4">
              {!user ? (
                <>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow" onClick={() => setIsAuthOpen(true)}>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Начать играть
                  </Button>
                  <Button size="lg" variant="outline" className="border-accent/50 text-accent" onClick={startDemoMode}>
                    <Icon name="Play" size={20} className="mr-2" />
                    Попробовать демо
                  </Button>
                </>
              ) : user.isDemo ? (
                <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow" onClick={() => { setUser(null); setIsAuthOpen(true); }}>
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Зарегистрироваться для реальной игры
                </Button>
              ) : null}
              <Button size="lg" variant="outline" className="border-primary/30">
                <Icon name="Gift" size={20} className="mr-2" />
                Все бонусы
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </section>

        <section id="promos" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">Промо и бонусы</h3>
            <Button variant="ghost">
              Все промо
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {promos.map((promo, idx) => (
              <Card key={idx} className="bg-card/50 border-primary/30 game-card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Icon name="Gift" size={32} className="text-accent" />
                    <Badge variant="secondary">Активен</Badge>
                  </div>
                  <CardTitle className="text-xl">{promo.title}</CardTitle>
                  <CardDescription>{promo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Промокод</p>
                    <p className="font-mono font-bold text-lg text-primary">{promo.code}</p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Активировать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-primary/20" />

        <section id="games">
          <Tabs defaultValue="slots" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-card/50 border border-primary/30">
                <TabsTrigger value="slots" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Coins" size={16} className="mr-2" />
                  Слоты
                </TabsTrigger>
                <TabsTrigger value="roulette" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Disc3" size={16} className="mr-2" />
                  Рулетка
                </TabsTrigger>
                <TabsTrigger value="poker" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Spade" size={16} className="mr-2" />
                  Покер
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="slots" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {games.slots.map((game) => (
                  <Card key={game.id} className="bg-card/50 border-primary/30 overflow-hidden game-card-hover cursor-pointer group" onClick={() => !user && startDemoMode()}>
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="Sparkles" size={64} className="text-primary/50 group-hover:text-primary transition-colors" />
                      {game.hot && (
                        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground gold-glow">
                          <Icon name="Flame" size={12} className="mr-1" />
                          HOT
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <CardDescription>{game.provider}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-muted-foreground">Джекпот</span>
                        <span className="font-bold text-accent">{game.jackpot}</span>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        {user ? 'Играть' : 'Играть в демо'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="roulette" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {games.roulette.map((game) => (
                  <Card key={game.id} className="bg-card/50 border-primary/30 overflow-hidden game-card-hover cursor-pointer group" onClick={() => !user && startDemoMode()}>
                    <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                      <Icon name="Disc3" size={64} className="text-secondary/50 group-hover:text-secondary transition-colors animate-spin-slow" />
                      {game.hot && (
                        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground gold-glow">
                          <Icon name="Flame" size={12} className="mr-1" />
                          HOT
                        </Badge>
                      )}
                      <Badge className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground">
                        {game.type}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <CardDescription>{game.provider}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-secondary hover:bg-secondary/90">
                        {user ? 'Играть' : 'Играть в демо'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="poker" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {games.poker.map((game) => (
                  <Card key={game.id} className="bg-card/50 border-primary/30 overflow-hidden game-card-hover cursor-pointer group" onClick={() => !user && startDemoMode()}>
                    <div className="relative h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <Icon name="Spade" size={64} className="text-accent/50 group-hover:text-accent transition-colors" />
                      {game.hot && (
                        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground gold-glow">
                          <Icon name="Flame" size={12} className="mr-1" />
                          HOT
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <CardDescription>{game.provider}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-muted-foreground">Игроков онлайн</span>
                        <span className="font-bold text-primary">{game.players}</span>
                      </div>
                      <Button className="w-full bg-accent hover:bg-accent/90 gold-glow">
                        {user ? 'Играть' : 'Играть в демо'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-card/30 rounded-2xl p-8 border border-primary/30">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Icon name="Headphones" size={48} className="text-primary" />
              <h3 className="text-2xl font-bold">Поддержка 24/7</h3>
              <p className="text-muted-foreground">
                Наша команда всегда готова помочь вам с любыми вопросами. Быстрый ответ гарантирован!
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Написать в поддержку
              </Button>
            </div>
            <div className="space-y-4">
              <Icon name="Shield" size={48} className="text-accent" />
              <h3 className="text-2xl font-bold">Безопасность</h3>
              <p className="text-muted-foreground">
                Лицензированное казино с проверенными играми. Все транзакции защищены, вывод за 5 минут.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-primary/30">SSL защита</Badge>
                <Badge variant="outline" className="border-primary/30">Лицензия</Badge>
                <Badge variant="outline" className="border-primary/30">18+</Badge>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/20 bg-card/30 backdrop-blur-md mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-primary">Игры</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Слоты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Рулетка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Покер</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Live Casino</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Лицензия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ответственная игра</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Бонусы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Следите за нами</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="border-primary/30">
                  <Icon name="Send" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/30">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/30">
                  <Icon name="AtSign" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-primary/20" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 КЕРЖ Казино. Все права защищены. 18+</p>
            <p className="mt-2">Играйте ответственно. Азартные игры могут вызывать зависимость.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;