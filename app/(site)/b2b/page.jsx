export default function B2BWholesalePage() {
  const products = [
    {
      id: 1,
      name: "Premium Saffron",
      image:
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80",
      singlePrice: "$18",
      wholesalePrice: "$12",
      moq: "50 packs",
      leadTime: "5-7 days",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Organic Dates",
      image:
        "https://images.unsplash.com/photo-1603048719539-9ecb4d7d62c5?auto=format&fit=crop&w=900&q=80",
      singlePrice: "$10",
      wholesalePrice: "$7",
      moq: "100 boxes",
      leadTime: "3-5 days",
      badge: "Bulk Ready",
    },
    {
      id: 3,
      name: "Mixed Nuts Box",
      image:
        "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80",
      singlePrice: "$22",
      wholesalePrice: "$16",
      moq: "40 boxes",
      leadTime: "7-10 days",
      badge: "Private Label",
    },
    {
      id: 4,
      name: "Olive Oil Bottle",
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
      singlePrice: "$14",
      wholesalePrice: "$9",
      moq: "60 bottles",
      leadTime: "5-8 days",
      badge: "Export Quality",
    },
  ];

  const benefits = [
    {
      title: "Competitive Wholesale Pricing",
      text: "Transparent tier pricing for distributors, retailers, and corporate buyers.",
    },
    {
      title: "Private Label Support",
      text: "Add your own brand packaging, labels, and custom box design.",
    },
    {
      title: "Fast Fulfillment",
      text: "Reliable production and shipment timelines for recurring orders.",
    },
    {
      title: "Dedicated Account Support",
      text: "A simple buyer workflow from quote request to delivery tracking.",
    },
  ];

  const steps = [
    "Browse wholesale-ready products",
    "Send your quantity and packaging requirements",
    "Receive a custom quote within 24 hours",
    "Confirm order and production timeline",
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              B2B Wholesale Solutions
            </span>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Source premium products in bulk for your business
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Built for distributors, resellers, supermarkets, and corporate
              buyers. Get better pricing, custom packaging, and dependable
              delivery for every bulk order.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                Explore Products
              </a>
              <a
                href="#quote"
                className="rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-orange-300 hover:text-orange-700"
              >
                Request a Quote
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold">120+</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Business clients served
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold">25+</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Export-ready products
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold">24h</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Average quote response
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 shadow">
                    {product.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-neutral-100 p-3">
                      <div className="text-neutral-500">Retail</div>
                      <div className="mt-1 font-semibold">
                        {product.singlePrice}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-orange-50 p-3">
                      <div className="text-orange-600">Wholesale</div>
                      <div className="mt-1 font-semibold text-orange-700">
                        {product.wholesalePrice}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                    <span>MOQ: {product.moq}</span>
                    <span>{product.leadTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
            Why buyers choose us
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Everything you need for B2B ordering
          </h2>
          <p className="mt-4 text-neutral-600">
            More than a catalog page. This is designed to convert business
            visitors into long-term wholesale buyers.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                Featured B2B Products
              </span>
              <h2 className="mt-4 text-3xl font-bold">Wholesale catalog</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-600">
              Show your top bulk products here with MOQ, business pricing, lead
              time, and CTA for quote-based checkout.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
                    {product.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-neutral-500">
                        Wholesale price
                      </div>
                      <div className="mt-1 text-2xl font-bold text-orange-700">
                        {product.wholesalePrice}
                      </div>
                    </div>
                    <div className="text-right text-sm text-neutral-500">
                      <div>MOQ</div>
                      <div className="font-semibold text-neutral-900">
                        {product.moq}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white p-3 text-sm text-neutral-600">
                    Lead time:{" "}
                    <span className="font-semibold text-neutral-900">
                      {product.leadTime}
                    </span>
                  </div>
                  <button className="mt-4 w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                    Get Wholesale Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              Simple wholesale buying process
            </h2>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl bg-neutral-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-neutral-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="quote"
            className="rounded-3xl border border-neutral-200 bg-neutral-900 p-8 text-white shadow-sm"
          >
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-200">
              Request pricing
            </span>
            <h2 className="mt-4 text-3xl font-bold">Tell us what you need</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-300">
              Perfect for inquiry-based B2B orders. You can later connect this
              form with your backend or CRM.
            </p>

            <form className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Company name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-400"
              />
              <input
                type="text"
                placeholder="Your name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-400"
              />
              <input
                type="email"
                placeholder="Business email"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-400"
              />
              <input
                type="text"
                placeholder="Phone / WhatsApp"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-400"
              />
              <input
                type="text"
                placeholder="Product name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-400 sm:col-span-2"
              />
              <textarea
                placeholder="Quantity, packaging, labeling, destination country, or other requirements"
                rows={5}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-400 sm:col-span-2"
              />
              <button
                type="button"
                className="rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 sm:col-span-2"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
