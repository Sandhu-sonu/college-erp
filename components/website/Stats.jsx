export default function Stats() {
  const stats = [
    {
      number: "2000+",
      label: "Students",
    },
    {
      number: "50+",
      label: "Faculty Members",
    },
    {
      number: "4",
      label: "Professional Courses",
    },
    {
      number: "10+",
      label: "Years of Excellence",
    },
  ];

  return (
    <section className="py-20 bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-4 gap-8 text-center">

          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold mb-4">
                {item.number}
              </h2>

              <p className="text-xl">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}