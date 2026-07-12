import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
    >
      <div>
        <h4 className="text-gray-500 text-sm">
          {title}
        </h4>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          {subtitle}
        </p>
      </div>

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl ${color}`}
      >
        {icon}
      </div>
    </motion.div>
  );
}

export default StatCard;