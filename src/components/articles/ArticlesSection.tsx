import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, ArrowRight, Maximize2, X } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    description: string;
    content: React.ReactNode;
}

interface ArticlesSectionProps {
    initialArticleId?: string | null;
    onArticleChange?: (id: string | null) => void;
}

export const ArticlesSection = ({ initialArticleId, onArticleChange }: ArticlesSectionProps) => {
    const { language } = useLanguage();
    const [selectedArticle, setSelectedArticle] = useState<string | null>(initialArticleId || null);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const handleSelectArticle = (id: string | null) => {
        setSelectedArticle(id);
        if (onArticleChange) onArticleChange(id);
    };

    // Sync with external changes if needed
    useState(() => {
        if (initialArticleId !== undefined && initialArticleId !== selectedArticle) {
            setSelectedArticle(initialArticleId);
        }
    });

    const articles: Article[] = [
        {
            id: 'compound-interest',
            title: language === 'ru' ? 'Протокол инициализации: Эффект сложного процента' : 'Protocol Initialization: The Compound Effect',
            description: language === 'ru' ? 'Как работает математика роста и почему время важнее суммы.' : 'How growth math works and why time matters more than the amount.',
            content: (
                <div className="space-y-8 font-sans text-lg text-white/70 leading-relaxed">
                    <section className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
                        <div className="space-y-6">
                            <p>
                                {language === 'ru'
                                    ? 'Сложный процент — это восьмое чудо света. Тот, кто понимает это — зарабатывает его, тот, кто не понимает — платит его. Эта цитата, приписываемая Эйнштейну, лежит в основе нашего симулятора.'
                                    : 'Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn\'t, pays it. This quote, often attributed to Einstein, is at the core of our simulator.'}
                            </p>
                            <p>
                                {language === 'ru'
                                    ? 'На схеме справа наглядно показана механика процесса. Все начинается с "Initial Investment", который в первые годы дает скромный результат. Однако со временем вступает в силу механизм "Interest on Interest" — проценты начинают начисляться не только на тело капитала, но и на уже заработанную прибыль. Это создает тот самый экспоненциальный взлет, который вы видите в правой части графика.'
                                    : 'The diagram on the right clearly illustrates the mechanics of the process. It all begins with the "Initial Investment", which yields modest results in the early years. However, over time, the "Interest on Interest" mechanism takes effect — interest begins to accrue not only on the principal but also on the profits already earned. This creates the exponential surge you see on the right side of the chart.'}
                            </p>
                        </div>

                        <div className="bg-card border-2 border-border p-2 overflow-hidden shadow-[16px_16px_0px_0px_rgba(var(--primary),0.05)] group relative">
                            <button
                                onClick={() => setZoomedImage('/assets/images/compound_interest.png')}
                                className="absolute top-4 right-4 z-20 p-2 bg-primary text-background opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                            <img
                                src="/assets/images/compound_interest.png"
                                alt="Compound Interest Curve"
                                className="w-full grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in"
                                onClick={() => setZoomedImage('/assets/images/compound_interest.png')}
                            />
                            <p className="text-[10px] font-mono uppercase tracking-widest text-center py-4 text-white/30 border-t border-border mt-2">
                                fig_01 // the_exponential_surge
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-3xl font-display font-bold tracking-tight text-white">
                            {language === 'ru' ? 'Анатомия роста' : 'Anatomy of Growth'}
                        </h3>
                        <p>
                            {language === 'ru'
                                ? 'В этом приложении мы используем формулу ежемесячного реинвестирования доходности. Каждый заработанный доллар начинает работать на вас уже в следующем месяце. Это создает эффект снежного кома, который сначала кажется незначительным, но со временем становится неостановимым.'
                                : 'In this app, we use a monthly reinvestment formula. Every dollar earned starts working for you in the very next month. This creates a snowball effect that may seem insignificant at first, but becomes unstoppable over time.'}
                        </p>
                        <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
                            <h4 className="text-primary font-display font-bold uppercase tracking-widest mb-4">
                                {language === 'ru' ? 'Ключевая концепция' : 'Core Concept'}
                            </h4>
                            <p className="text-xl font-medium italic text-white/90">
                                {language === 'ru'
                                    ? '"Время — это рычаг, а доходность — это точка опоры. Чем дольше вы даете капиталу работать, тем меньше усилий требуется для достижения результата."'
                                    : '"Time is the lever, and yield is the fulcrum. The longer you let capital work, the less effort is required to achieve results."'}
                            </p>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 items-center">
                            <div className="bg-card border-2 border-border p-2 overflow-hidden shadow-[16px_16px_0px_0px_rgba(var(--primary),0.05)] order-2 lg:order-1 group relative">
                                <button
                                    onClick={() => setZoomedImage('/assets/images/time_balance.png')}
                                    className="absolute top-4 right-4 z-20 p-2 bg-primary text-background opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                                <img
                                    src="/assets/images/time_balance.png"
                                    alt="The Cost of Waiting"
                                    className="w-full grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in"
                                    onClick={() => setZoomedImage('/assets/images/time_balance.png')}
                                />
                                <p className="text-[10px] font-mono uppercase tracking-widest text-center py-4 text-white/30 border-t border-border mt-2">
                                    fig_02 // the_opportunity_cost
                                </p>
                            </div>
                            <div className="space-y-6 order-1 lg:order-2">
                                <h3 className="text-3xl font-display font-bold tracking-tight text-white">
                                    {language === 'ru' ? 'Цена ожидания' : 'The Cost of Waiting'}
                                </h3>
                                <p>
                                    {language === 'ru'
                                        ? 'Основной взрыв роста происходит в последней трети вашего срока инвестирования. Пропустив первые 5 лет, вы не просто теряете 5 лет — вы отрезаете себе самую прибыльную "верхушку" графика в конце пути. На схеме слева видно, как ожидание в 20 лет может стоить вам почти миллиона долларов потенциального капитала.'
                                        : 'The primary growth explosion occurs in the final third of your investment period. By skipping the first 5 years, you don\'t just lose 5 years — you cut off the most profitable "top" of the chart at the end of the journey. The diagram on the left showing how waiting 20 years can cost you nearly a million dollars in potential capital.'}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6 pt-8 border-t border-border">
                        <p>
                            {language === 'ru'
                                ? 'Именно поэтому мы добавили слайдер "Duration" до 40 лет. Поиграйте со значениями: вы увидите, что лишние 5 лет в конце срока могут удвоить ваш финальный капитал. Это и есть магия экспоненты в действии.'
                                : 'That\'s exactly why we added a "Duration" slider up to 40 years. Play with the values: you\'ll see that an extra 5 years at the end of the term can double your final capital. This is the magic of the exponent in action.'}
                        </p>
                    </section>
                </div>
            )
        },
        {
            id: 'market-reality',
            title: language === 'ru' ? 'Ретроспектива: Проверка реальностью' : 'Retrospective: Market Reality Check',
            description: language === 'ru' ? 'Зачем смотреть в прошлое и как исторические данные помогают не строить иллюзий.' : 'Why look at the past and how historical data helps avoid illusions.',
            content: (
                <div className="space-y-12 font-sans text-lg text-white/70 leading-relaxed">
                    <section className="space-y-6">
                        <p>
                            {language === 'ru'
                                ? 'Проекции в первом разделе — это математический идеал, "чистая комната" без трения и шума. Но реальный рынок никогда не растет по линеечке. Он дышит, падает, замирает на десятилетия и иногда проверяет вашу волю на прочность.'
                                : 'The projections in the first section are a mathematical ideal—a "clean room" without friction or noise. But the real market never grows in a straight line. It breathes, crashes, stalls for decades, and sometimes tests your willpower to its limits.'}
                        </p>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                                {language === 'ru' ? '01 // Циклы хаоса' : '01 // Cycles of Chaos'}
                            </h3>
                            <p>
                                {language === 'ru'
                                    ? 'Режим ретроспективы позволяет вам "прожить" любой исторический период. Проверьте, что было бы с вашим портфелем, если бы вы начали инвестировать в 2000 или 2008 году. Увидели бы вы -50% на счету? Хватило бы у вас дисциплины продолжать взносы?'
                                    : 'The retrospective mode allows you to "live through" any historical period. Check what would have happened to your portfolio if you started investing in 2000 or 2008. Would you have seen a -50% drawdown? Would you have had the discipline to keep contributing?'}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                                {language === 'ru' ? '02 // Ловушка застоя' : '02 // The Stagnation Trap'}
                            </h3>
                            <p>
                                {language === 'ru'
                                    ? 'История знает периоды (например, 2000–2013), когда широкий рынок (S&P 500) фактически стоял на месте. Ретроспектива показывает, как регулярные ежемесячные пополнения (DCA) превращают время "боковика" в возможность закупки дешевых активов перед будущим взлетом.'
                                    : 'History knows periods (e.g., 2000–2013) when the broad market (S&P 500) effectively stayed flat. The retrospective shows how regular monthly contributions (DCA) turn "sideways" time into an opportunity to accumulate cheap assets before the next surge.'}
                            </p>
                        </div>
                    </section>

                    <div className="bg-primary/5 border-l-4 border-primary p-8 my-12">
                        <h4 className="text-primary font-display font-black uppercase tracking-widest mb-4">
                            {language === 'ru' ? 'Тихий двигатель' : 'The Silent Engine'}
                        </h4>
                        <p className="text-xl font-medium text-white/90">
                            {language === 'ru'
                                ? 'В наших данных используется показатель Adjusted Close. Это критически важно: он учитывает дивиденды. Без реинвестирования дивидендов доходность S&P 500 за последние 30 лет была бы почти в два раза ниже.'
                                : 'Our data uses the Adjusted Close metric. This is critical: it accounts for dividends. Without dividend reinvestment, the S&P 500 returns over the last 30 years would be nearly twice as low.'}
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
                            {language === 'ru' ? 'Психологический суверенитет' : 'Psychological Sovereignty'}
                        </h3>
                        <p>
                            {language === 'ru'
                                ? 'Главный враг инвестора — не рынок, а собственная паника во время коррекций. Ретроспективный анализ учит смотреть на кризисы не как на катастрофы, а как на временные отклонения от долгосрочного вектора роста. Это инструмент для закалки вашего финансового характера.'
                                : 'An investor\'s main enemy isn\'t the market, but their own panic during corrections. Retrospective analysis teaches you to view crises not as catastrophes, but as temporary deviations from a long-term growth vector. It is a tool for forging your financial character.'}
                        </p>
                    </section>
                </div>
            )
        },
        {
            id: 'capability-matrix',
            title: language === 'ru' ? 'Матрица возможностей: Геймификация свободы' : 'Capability Matrix: Gamifying Freedom',
            description: language === 'ru' ? 'Разбор уровней жизни и того, как пассивный доход покупает вам время.' : 'Breakdown of lifestyle levels and how passive income buys you time.',
            content: (
                <div className="space-y-12 font-sans text-lg text-white/70 leading-relaxed">
                    <section className="space-y-6">
                        <p>
                            {language === 'ru'
                                ? 'Цифры на банковском счету — плохой мотиватор. Наш мозг не эволюционировал для понимания семизначных чисел, но он прекрасно понимает комфорт, безопасность и личное время. Матрица возможностей переводит сухой капитал на язык реальных достижений.'
                                : 'Bank balance numbers are poor motivators. Our brains didn\'t evolve to comprehend seven-digit figures, but they perfectly understand comfort, security, and personal time. The Capability Matrix translates dry capital into the language of real-world achievements.'}
                        </p>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                                {language === 'ru' ? 'Лестница автономии' : 'The Autonomy Ladder'}
                            </h3>
                            <p>
                                {language === 'ru'
                                    ? 'Мы разделили путь к богатству на четыре критических этапа. Каждый этап — это качественный скачок в уровне личного суверенитета. От закрытия базовых счетов (Basic Needs) до состояния, когда ваши внуки будут обеспечены (Luxury/Legacy).'
                                    : 'We have divided the path to wealth into four critical stages. Each stage represents a qualitative leap in personal sovereignty. From covering basic bills (Basic Needs) to a state where even your grandchildren are provided for (Luxury/Legacy).'}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                                {language === 'ru' ? 'Психологический якорь' : 'Psychological Anchoring'}
                            </h3>
                            <p>
                                {language === 'ru'
                                    ? 'Визуализация целей через иконки и уровни — это не просто геймификация. Это способ привязать долгосрочную дисциплину к краткосрочным победам. Каждый разблокированный "чекбокс" в матрице — это маленькая победа вашей воли над хаосом.'
                                    : 'Visualizing goals through icons and tiers isn\'t just gamification. It\'s a way to anchor long-term discipline to short-term wins. Every unlocked checkbox in the matrix is a small victory of your will over chaos.'}
                            </p>
                        </div>
                    </section>

                    <div className="bg-primary/5 border-l-4 border-primary p-8 my-12">
                        <h4 className="text-primary font-display font-black uppercase tracking-widest mb-4">
                            {language === 'ru' ? 'Золотой стандарт: 4%' : 'The Golden Standard: 4%'}
                        </h4>
                        <p className="text-xl font-medium text-white/90">
                            {language === 'ru'
                                ? 'В основе расчетов лежит классическая концепция из Trinity Study. Предполагается, что вы можете безопасно изымать 4% от капитала ежегодно, не истощая его основное тело. Это создает бесконечный поток ресурсов для вашего лайфстайла.'
                                : 'The calculations are based on the classic concept from the Trinity Study. It assumes you can safely withdraw 4% of your capital annually without depleting the principal. This creates an infinite stream of resources for your lifestyle.'}
                        </p>
                    </div>

                    <section className="space-y-6">
                        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
                            {language === 'ru' ? 'Валюта Свободы — это Время' : 'The Currency of Freedom is Time'}
                        </h3>
                        <p>
                            {language === 'ru'
                                ? 'Когда ваш пассивный доход покрывает аренду, вы покупаете себе 40 часов в неделю, которые раньше тратили на заработок этих денег. Матрица показывает, сколько лет жизни вы уже "выкупили" у системы. Используйте её не как список покупок, а как карту освобождения.'
                                : 'When your passive income covers your rent, you are buying back 40 hours a week that you used to spend earning that money. The Matrix shows how many years of your life you have already "bought back" from the system. Use it not as a shopping list, but as a map of emancipation.'}
                        </p>
                    </section>
                </div>
            )
        }
    ];

    const renderContent = () => {
        if (selectedArticle) {
            const article = articles.find(a => a.id === selectedArticle);
            return (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <button
                        onClick={() => handleSelectArticle(null)}
                        className="mb-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-primary uppercase hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        {language === 'ru' ? 'Назад к списку' : 'Back to list'}
                    </button>
                    <div className="bg-card border-2 border-border p-6 md:p-10 lg:p-12 w-full shadow-[24px_24px_0px_0px_rgba(var(--primary),0.05)]">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white leading-tight mb-6">
                            {article?.title}
                        </h2>
                        <div className="w-full">
                            {article?.content}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => handleSelectArticle(article.id)}
                        className="bg-card border-2 border-border p-6 hover:border-primary transition-all cursor-pointer group flex flex-col justify-between gap-6"
                    >
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-background transition-colors">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-display font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-sm font-normal text-white/50 leading-relaxed">
                                {article.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary uppercase">
                            {language === 'ru' ? 'Читать протокол' : 'Read protocol'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {renderContent()}

            {/* Image Zoom Portal / Modal */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 sm:p-10 animate-in fade-in duration-300"
                    onClick={() => setZoomedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-full"
                        onClick={() => setZoomedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={zoomedImage}
                        className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500"
                        alt="Zoomed Illustration"
                    />
                </div>
            )}
        </>
    );
};
