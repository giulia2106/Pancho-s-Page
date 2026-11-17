import { type ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowUpRight, Dog, RefreshCw } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [dogImage, setDogImage] = useState('');
  const [dogLoading, setDogLoading] = useState(true);
  const [dogError, setDogError] = useState('');

  const fetchDog = useCallback(async () => {
    setDogLoading(true);
    setDogError('');
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) throw new Error('The dog photo could not be loaded.');
      const data: { message?: string; status?: string } = await response.json();
      if (data.status !== 'success' || !data.message) {
        throw new Error('The dog photo could not be loaded.');
      }
      setDogImage(data.message);
    } catch {
      setDogImage('');
      setDogError('That pup is playing hide-and-seek. Try again in a moment.');
    } finally {
      setDogLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDog();
  }, [fetchDog]);

  return (
    <div className="site-shell min-h-[100dvh]" data-testid="page-about">
      <header className="topbar">
        <a className="brand-mark" href="#top" data-testid="link-home">giulia<span>.</span></a>
        <nav className="nav-links" aria-label="Main navigation" data-testid="nav-main">
          <a href="#little-things" data-testid="link-interests">The little things</a>
          <a href="#movies" data-testid="link-movies">Movie night</a>
          <a href="#dog-ceo" data-testid="link-dog">Dog CEO</a>
          <a href="#pancho" data-testid="link-pancho">Pancho</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="reveal">
            <div className="eyebrow">A little page about me</div>
            <h1 className="display-font" data-testid="text-page-title">About<br /><em>Me</em></h1>
            <p className="hero-copy" data-testid="text-introduction">Hello my name is giulia, my hobbies are:</p>
            <a className="hero-under" href="https://www.pinterest.com" target="_blank" rel="noreferrer" data-testid="link-pinterest">
              Click Here <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-art reveal-delay" aria-label="Illustrated sunshine and hills" role="img" data-testid="illustration-hero">
            <div className="sun-disc" />
            <div className="arch-line" />
            <div className="floating-note">a sunny little hello</div>
            <div className="art-caption">hello, i'm giulia</div>
          </div>
        </section>

        <section className="section" id="little-things" data-testid="section-interests">
          <div className="section-heading">
            <div>
              <div className="eyebrow">The things I love</div>
              <h2 className="display-font">My kind of fun</h2>
            </div>
            <p>Good days are made of familiar faces, new places, and finding something you love.</p>
          </div>
          <p className="hero-under" style={{ marginTop: 0, marginBottom: 24 }} data-testid="text-age">i am 15 years old</p>
          <div className="interest-grid">
            <article className="interest-card card-friends" data-testid="card-interest-friends">
              <span className="number">01 / PEOPLE</span>
              <div className="mini-art" aria-hidden="true" />
              <h3>Friends &amp; family</h3>
              <p>Hanging out with friends and family.</p>
            </article>
            <article className="interest-card card-travel" data-testid="card-interest-travelling">
              <span className="number">02 / PLACES</span>
              <div className="mini-art" aria-hidden="true" />
              <h3>Travelling</h3>
              <p>Seeing somewhere new and taking it all in.</p>
            </article>
            <article className="interest-card card-shopping" data-testid="card-interest-shopping">
              <span className="number">03 / FINDS</span>
              <div className="mini-art" aria-hidden="true" />
              <h3>Shopping</h3>
              <p>A little browse can turn into a lovely find.</p>
            </article>
          </div>
        </section>

        <section className="movie-section" id="movies" data-testid="section-movies">
          <div className="movie-inner">
            <div>
              <div className="eyebrow">Snacks, please</div>
              <h2 className="display-font">My favorite<br />movies are:</h2>
              <p>Three picks for a cozy movie night. The list speaks for itself.</p>
            </div>
            <div className="movie-list" aria-label="Giulia's favorite movies">
              <div className="movie-item" data-testid="movie-how-to-lose-a-guy"><span>How to lose a guy in 10 day</span><span>01</span></div>
              <div className="movie-item" data-testid="movie-hunger-games"><span>Hunger Games</span><span>02</span></div>
              <div className="movie-item" data-testid="movie-just-go-with-it"><span>Just go with it</span><span>03</span></div>
            </div>
          </div>
        </section>

        <section className="dog-section" id="dog-ceo" data-testid="section-dog-ceo">
          <div className="dog-inner">
            <div>
              <div className="eyebrow">A very good surprise</div>
              <h2 className="display-font">Dog CEO<br />of the day</h2>
              <p>A new dog photo, just because. Tap below to meet another very good dog.</p>
              <button className="dog-button" onClick={() => void fetchDog()} disabled={dogLoading} aria-describedby="dog-status" data-testid="button-new-dog">
                <RefreshCw size={15} aria-hidden="true" className={dogLoading ? 'animate-spin' : ''} />
                {dogLoading ? 'Finding a pup…' : 'Show me a dog'}
                <ArrowDown size={14} aria-hidden="true" />
              </button>
              <p className={`dog-status${dogError ? ' dog-error' : ''}`} id="dog-status" aria-live="polite" role={dogError ? 'alert' : 'status'} data-testid="status-dog">
                {dogLoading ? 'Loading a delightful dog photo…' : dogError || 'A fresh face, every time.'}
                {dogError && <button className="retry-link" onClick={() => void fetchDog()} data-testid="button-retry-dog"> Try again</button>}
              </p>
            </div>
            <div className="dog-frame" data-testid="frame-dog">
              {dogImage && !dogError ? (
                <img
                  src={dogImage}
                  alt="A randomly selected dog from Dog CEO"
                  data-testid="img-dog"
                  onError={() => {
                    setDogImage('');
                    setDogError('That pup is playing hide-and-seek. Try again in a moment.');
                    setDogLoading(false);
                  }}
                />
              ) : (
                <div className="dog-placeholder" aria-label={dogLoading ? 'Dog photo loading' : 'Dog photo unavailable'} data-testid="placeholder-dog">
                  <span className="dog-placeholder-eyebrow">{dogLoading ? 'Fetching a friend' : 'A spot for a pup'}</span>
                  <span className="dog-placeholder-shape" aria-hidden="true" />
                  <span className="dog-placeholder-caption">{dogLoading ? 'One moment, please' : 'Come back for another try'}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pancho-section" id="pancho" data-testid="section-pancho">
          <div className="pancho-inner">
            <div className="pancho-copy">
              <div className="eyebrow">A little introduction</div>
              <h2 className="display-font">Pancho’s<br />Page</h2>
              <p className="pancho-description">Mini long-haired dachshund</p>
              <ul className="pancho-facts" aria-label="Pancho facts">
                <li>Pancho likes to sleep</li>
                <li>Pancho likes to play a lot</li>
                <li>Pancho likes to run in the backyard</li>
              </ul>
            </div>
            <div
              className="pancho-portrait"
              role="img"
              aria-label="Decorative illustration of Pancho"
              data-testid="illustration-pancho"
            >
              <span className="pancho-note">meet Pancho</span>
              <Dog className="pancho-dog-icon" size={132} strokeWidth={1.25} aria-hidden="true" />
              <span className="pancho-caption">our little friend</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span data-testid="text-footer">A small corner of the internet, by Giulia.</span>
        <a href="#top" data-testid="link-back-to-top">Back to top ↑</a>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
