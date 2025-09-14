import { useAuth } from '../src/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-100 via-slate-200 to-emerald-50" />
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 lg:py-32"> {/* Increased padding */}
          <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 px-4 py-2 text-xl md:text-2xl font-semibold"> {/* Increased font size and padding */}
            Fair. Fast. Transparent.
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight"> {/* Increased font size */}
            Farm2Bazaar — direct farmer–retailer deals with fair prices and zero waste
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 max-w-3xl"> {/* Increased font size */}
            Real-time rates, faster selling, and predictable supply—reduce waste and improve earnings.
          </p>
          {!isLoggedIn && (
            <div className="mt-10 flex flex-wrap items-center gap-4"> {/* Increased margin and gap */}
              <a
                href="/signup?role=farmer"
                className="rounded-xl bg-emerald-600 text-white px-7 py-4 text-lg md:text-xl font-semibold hover:bg-emerald-700 transition-colors"> {/* Increased padding and font size */}
                I’m a Farmer
              </a>
              <a
                href="/signup?role=retailer"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-lg md:text-xl font-semibold hover:bg-slate-100 transition-colors"> {/* Increased padding and font size */}
                I’m a Retailer
              </a>
              <a href="#how" className="text-emerald-700 font-semibold text-lg md:text-xl hover:underline"> {/* Increased font size */}
                See how it works →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Problem → Promise */}
      <section className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 grid md:grid-cols-2 gap-10"> {/* Increased padding and gap */}
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5"> {/* Increased padding and shadow */}
            <h2 className="text-3xl md:text-4xl font-bold">The Problem</h2> {/* Increased font size */}
            <ul className="mt-4 space-y-3 text-slate-700 text-lg md:text-xl font-semibold"> {/* Increased font size and spacing */}
              <li>- Middlemen take a large cut; farmers earn less.</li>
              <li>- 30–40% produce waste due to slow, broken linkages.</li>
              <li>- Retailers face inconsistent supply and volatile prices.</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5"> {/* Increased padding and shadow */}
            <h2 className="text-3xl md:text-4xl font-bold">The Promise</h2> {/* Increased font size */}
            <ul className="mt-4 space-y-3 text-slate-700 text-lg md:text-xl font-semibold"> {/* Increased font size and spacing */}
              <li>- Direct farmer–retailer bridge: faster, transparent deals.</li>
              <li>- Real-time market rates to anchor fair pricing.</li>
              <li>- Smart workflows that reduce waste and stockouts.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Value blocks */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 py-20"> {/* Increased padding */}
        <h3 className="text-4xl md:text-5xl font-extrabold">Why Farm2Bazaar</h3> {/* Increased font size */}
        <p className="mt-3 text-xl md:text-2xl text-slate-600 max-w-2xl"> {/* Increased font size */}
          Clear, text-only blocks that communicate value fast.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-8"> {/* Increased margin and gap */}
          {[
            { h: "Fair, transparent pricing", b: "Live min/modal/max by district keeps negotiations honest." },
            { h: "Direct deals, faster cash", b: "No intermediaries; predictable supply and settlements." },
            { h: "Less waste, more sales", b: "Expiry cues and buyer alerts move produce on time." },
            { h: "Role-based dashboards", b: "Simple farmer and retailer views focused on outcomes." },
            { h: "Mobile-first + SMS/voice", b: "Accessible for low digital literacy and poor networks." },
            { h: "Actionable analytics", b: "Trends, earnings insights, and reorder patterns." },
          ].map((card) => (
            <div
              key={card.h}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition"> {/* Increased padding and shadow */}
              <div className="inline-flex rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 text-base md:text-lg font-semibold"> {/* Increased font size and padding */}
                {card.h}
              </div>
              <p className="mt-4 text-lg md:text-xl text-slate-700">{card.b}</p> {/* Increased font size */}
            </div>
          ))}
        </div>
      </section>

      {/* Live price preview */}
      <section className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 grid lg:grid-cols-2 gap-10 items-start"> {/* Increased padding and gap */}
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold">Today’s market snapshot</h3> {/* Increased font size */}
            <p className="mt-3 text-xl md:text-2xl text-slate-600">Reference rates—clean and concise.</p> {/* Increased font size */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4"> {/* Increased margin and gap */}
              {[
                { c: "Tomato", m: "₹12 / ₹15 / ₹20" },
                { c: "Onion", m: "₹18 / ₹22 / ₹28" },
                { c: "Potato", m: "₹16 / ₹20 / ₹24" },
                { c: "Mango", m: "₹70 / ₹90 / ₹120" },
                { c: "Wheat", m: "₹20 / ₹24 / ₹28" },
                { c: "Mustard", m: "₹55 / ₹60 / ₹66" },
              ].map((r) => (
                <div key={r.c} className="rounded-xl bg-white p-5 shadow ring-1 ring-black/5"> {/* Increased padding */}
                  <div className="font-semibold text-lg md:text-xl">{r.c}</div> {/* Increased font size */}
                  <div className="mt-1 text-base md:text-lg text-slate-600">{r.m}</div> {/* Increased font size */}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5"> {/* Increased padding and shadow */}
            <h4 className="text-2xl md:text-3xl font-bold">What it means</h4> {/* Increased font size */}
            <ul className="mt-4 space-y-3 text-slate-700 text-lg md:text-xl"> {/* Increased font size and spacing */}
              <li>- Modal is the fair anchor for quick deals.</li>
              <li>- Asking below modal gets highlighted for buyers.</li>
              <li>- Aging &gt; 24h triggers notifications to nearby buyers.</li>
            </ul>
            <div className="mt-6 h-24 rounded-lg bg-gradient-to-r from-slate-200 to-emerald-100" /> {/* Increased height */}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 md:px-12 py-20"> {/* Increased padding */}
        <h3 className="text-4xl md:text-5xl font-extrabold">How it works</h3> {/* Increased font size */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-6"> {/* Increased margin and gap */}
          {[
            "Farmer registers & lists produce",
            "Market API fetches current prices",
            "Retailer browses stock & rates",
            "Retailer places direct order",
            "Farmer gets instant confirmation",
          ].map((s, i) => (
            <div key={s} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-md"> {/* Increased padding and shadow */}
              <div className="mx-auto mb-3 size-12 rounded-full bg-emerald-600 text-white grid place-items-center font-bold text-xl"> {/* Increased size and font size */}
                {i + 1}
              </div>
              <p className="text-base md:text-lg text-slate-700">{s}</p> {/* Increased font size */}
            </div>
          ))}
        </div>
      </section>

      {/* Proof & trust */}
      <section className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 grid md:grid-cols-3 gap-8"> {/* Increased padding and gap */}
          {[
            { k: "18%+", v: "avg. earnings uplift" },
            { k: "30–40%", v: "waste cut goal" },
            { k: "2 min", v: "to onboard" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-3xl bg-white px-8 py-10 shadow-lg ring-1 ring-black/5 text-center"> {/* Increased padding and shadow */}
              <div className="text-4xl md:text-5xl font-extrabold text-emerald-700">{s.k}</div> {/* Increased font size */}
              <div className="mt-2 text-base md:text-lg text-slate-700">{s.v}</div> {/* Increased font size */}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-emerald-200 to-slate-200" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-20 text-center"> {/* Increased padding */}
          <h3 className="text-4xl md:text-5xl font-extrabold">Start transacting the fair way</h3> {/* Increased font size */}
          <p className="mt-3 text-xl md:text-2xl text-slate-600"> {/* Increased font size */}
            Choose a path—finish signup in under 2 minutes.
          </p>
          {!isLoggedIn && (
            <div className="mt-8 flex flex-wrap justify-center gap-4"> {/* Increased margin and gap */}
              <a
                href="/signup?role=farmer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-7 py-4 text-lg md:text-xl font-semibold hover:bg-emerald-700 transition-colors"> {/* Increased padding and font size */}
                I’m a Farmer
              </a>
              <a
                href="/signup?role=retailer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-lg md:text-xl font-semibold hover:bg-slate-100 transition-colors"> {/* Increased padding and font size */}
                I’m a Retailer
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
